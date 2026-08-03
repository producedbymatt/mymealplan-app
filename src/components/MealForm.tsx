import { useState, useEffect, useMemo } from "react";
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
  protein: "",
  carbs: "",
  sugars: "",
  fat: "",
};

export const MealForm = ({ onSubmit, initialMeal, onCancel, submitButtonText }: MealFormProps) => {
  const [meal, setMeal] = useState({
    meal_name: initialMeal?.meal_name || "",
    calories: initialMeal?.calories?.toString() || "",
    protein: initialMeal?.protein?.toString() || "",
    carbs: initialMeal?.carbs?.toString() || "",
    sugars: initialMeal?.sugars?.toString() || "",
    fat: initialMeal?.fat?.toString() || "",
  });
  const [previousMeals, setPreviousMeals] = useState<MealLog[]>([]);

  useEffect(() => {
    setMeal({
      meal_name: initialMeal?.meal_name || "",
      calories: initialMeal?.calories?.toString() || "",
      protein: initialMeal?.protein?.toString() || "",
      carbs: initialMeal?.carbs?.toString() || "",
      sugars: initialMeal?.sugars?.toString() || "",
      fat: initialMeal?.fat?.toString() || "",
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
      fat: parseInt(meal.fat) || 0,
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
        fat: (selected.fat ?? 0).toString(),
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

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionFilter, setSuggestionFilter] = useState("");

  const filteredSuggestions = useMemo(() => {
    if (!suggestionFilter.trim()) return previousMeals.slice(0, 6);
    const term = suggestionFilter.toLowerCase();
    return previousMeals.filter(m =>
      m.meal_name.toLowerCase().includes(term)
    ).slice(0, 6);
  }, [previousMeals, suggestionFilter]);

  const handleMealNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMeal({ ...meal, meal_name: value });
    setSuggestionFilter(value);
    setShowSuggestions(true);
  };

  const handleSuggestionSelect = (selected: MealLog) => {
    setMeal({
      meal_name: selected.meal_name,
      calories: selected.calories.toString(),
      protein: (selected.protein ?? 0).toString(),
      carbs: (selected.carbs ?? 0).toString(),
      sugars: (selected.sugars ?? 0).toString(),
      fat: (selected.fat ?? 0).toString(),
    });
    setSuggestionFilter(selected.meal_name);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1 relative">
        <Label htmlFor="meal_name">Meal name</Label>
        <div className="relative">
          <Input
            id="meal_name"
            placeholder="Type a meal name or pick a saved meal"
            value={meal.meal_name}
            onChange={handleMealNameChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            autoComplete="off"
            className="pr-9"
          />
          {!initialMeal && previousMeals.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full w-9 text-muted-foreground"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setSuggestionFilter("");
                setShowSuggestions((prev) => !prev);
              }}
              aria-label="Show saved meals"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
        </div>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                className="flex items-center justify-between px-1 hover:bg-accent"
              >
                <button
                  type="button"
                  className="flex-1 text-left px-2 py-2 text-sm flex items-center gap-2 min-w-0"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSuggestionSelect(suggestion)}
                >
                  <span className="truncate">{suggestion.meal_name}</span>
                  {index === 0 && !suggestionFilter.trim() && (
                    <Badge variant="secondary" className="shrink-0">Recent</Badge>
                  )}
                  <span className="text-xs text-muted-foreground shrink-0 ml-auto">
                    {suggestion.calories} cal
                  </span>
                </button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => handleDeleteMeal(suggestion.id, e)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
        {!initialMeal && meal.meal_name.trim() &&
          !previousMeals.some(
            (m) => m.meal_name.toLowerCase() === meal.meal_name.trim().toLowerCase()
          ) && (
            <p className="text-xs text-muted-foreground">
              New meal — it'll be saved to your list when you log it.
            </p>
          )}
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
      <div className="grid grid-cols-2 gap-3">
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
        <div className="space-y-1">
          <Label htmlFor="fat">Fat (g)</Label>
          <Input
            id="fat"
            type="number"
            min="0"
            placeholder="0"
            value={meal.fat}
            onChange={(e) => setMeal({ ...meal, fat: e.target.value })}
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
