import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MealLog, MealInput } from "@/hooks/useMealLogs";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface MealFormProps {
  onSubmit: (meal: MealInput) => void;
  initialMeal?: MealLog;
  onCancel?: () => void;
  submitButtonText?: string;
}

const emptyMeal = {
  meal_name: "",
  calories: "",
const emptyMeal = {
  meal_name: "",
  calories: "",
  protein: "",
  carbs: "",
  sugars: "",
  fat: "",
};
    meal_name: initialMeal?.meal_name || "",
    calories: initialMeal?.calories?.toString() || "",
    protein: initialMeal?.protein?.toString() || "",
    carbs: initialMeal?.carbs?.toString() || "",
    sugars: initialMeal?.sugars?.toString() || "",
  });
  const [previousMeals, setPreviousMeals] = useState<MealLog[]>([]);

  useEffect(() => {
    setMeal({
      meal_name: initialMeal?.meal_name || "",
      calories: initialMeal?.calories?.toString() || "",
      protein: initialMeal?.protein?.toString() || "",
      carbs: initialMeal?.carbs?.toString() || "",
      sugars: initialMeal?.sugars?.toString() || "",
    });
  }, [initialMeal]);

  useEffect(() => {
    const fetchPreviousMeals = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user.id) return;

      const { data, error } = await supabase
        .from('meal_logs')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching previous meals:', error);
        return;
      }

      const uniqueMeals = data.reduce((acc: MealLog[], current) => {
        const exists = acc.some(
          m => m.meal_name === current.meal_name && m.calories === current.calories
        );
        if (!exists) acc.push(current as MealLog);
        return acc;
      }, []);

      const mostRecent = uniqueMeals[0];
      const otherMeals = uniqueMeals.slice(1).sort((a, b) =>
        a.meal_name.localeCompare(b.meal_name)
      );

      setPreviousMeals(mostRecent ? [mostRecent, ...otherMeals] : otherMeals);
    };

    fetchPreviousMeals();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meal.meal_name || !meal.calories) return;

    onSubmit({
      meal_name: meal.meal_name,
      calories: parseInt(meal.calories) || 0,
      protein: parseInt(meal.protein) || 0,
      carbs: parseInt(meal.carbs) || 0,
      sugars: parseInt(meal.sugars) || 0,
    });

    if (!initialMeal) setMeal(emptyMeal);
  };

  const handlePreviousMealSelect = (mealId: string) => {
    const selected = previousMeals.find(m => m.id === mealId);
    if (selected) {
      setMeal({
        meal_name: selected.meal_name,
        calories: selected.calories.toString(),
        protein: (selected.protein ?? 0).toString(),
        carbs: (selected.carbs ?? 0).toString(),
        sugars: (selected.sugars ?? 0).toString(),
      });
    }
  };

  const handleDeleteMeal = async (mealId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      const mealToDelete = previousMeals.find(m => m.id === mealId);
      if (!mealToDelete) return;

      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user.id) return;

      const { error } = await supabase
        .from('meal_logs')
        .delete()
        .eq('user_id', session.session.user.id)
        .eq('meal_name', mealToDelete.meal_name)
        .eq('calories', mealToDelete.calories);

      if (error) {
        toast.error("Failed to delete meal");
        return;
      }

      setPreviousMeals(prev =>
        prev.filter(m =>
          !(m.meal_name === mealToDelete.meal_name && m.calories === mealToDelete.calories)
        )
      );
      toast.success("Meal deleted successfully");
    } catch {
      toast.error("An error occurred while deleting the meal");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!initialMeal && previousMeals.length > 0 && (
        <div>
          <Select onValueChange={handlePreviousMealSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a previous meal" />
            </SelectTrigger>
            <SelectContent>
              {previousMeals.map((prevMeal, index) => (
                <SelectItem
                  key={prevMeal.id}
                  value={prevMeal.id}
                  className="hover:bg-[#0EA5E9]/50 hover:text-white data-[highlighted]:bg-[#0EA5E9]/50 data-[highlighted]:text-white flex justify-between items-center pr-2"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="truncate">
                      {prevMeal.meal_name} ({prevMeal.calories} cal)
                    </span>
                    {index === 0 && (
                      <Badge variant="secondary" className="ml-2 shrink-0">Recent</Badge>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0 ml-2"
                    onClick={(e) => handleDeleteMeal(prevMeal.id, e)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="space-y-1">
        <Label htmlFor="meal_name">Meal name</Label>
        <Input
          id="meal_name"
          placeholder="Meal name"
          value={meal.meal_name}
          onChange={(e) => setMeal({ ...meal, meal_name: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="calories">Calories</Label>
        <Input
          id="calories"
          type="number"
          placeholder="Calories"
          value={meal.calories}
          onChange={(e) => setMeal({ ...meal, calories: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <Label htmlFor="protein">Protein (g)</Label>
          <Input
            id="protein"
            type="number"
            min="0"
            placeholder="0"
            value={meal.protein}
            onChange={(e) => setMeal({ ...meal, protein: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="carbs">Carbs (g)</Label>
          <Input
            id="carbs"
            type="number"
            min="0"
            placeholder="0"
            value={meal.carbs}
            onChange={(e) => setMeal({ ...meal, carbs: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="sugars">Sugars (g)</Label>
          <Input
            id="sugars"
            type="number"
            min="0"
            placeholder="0"
            value={meal.sugars}
            onChange={(e) => setMeal({ ...meal, sugars: e.target.value })}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="w-full bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950">
          {submitButtonText || (initialMeal ? "Update Meal" : "Add Meal")}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};
