import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MealLog } from "@/hooks/useMealLogs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";

interface MealFormProps {
  onSubmit: (meal: { meal_name: string; calories: number }) => void;
  initialMeal?: MealLog;
  onCancel?: () => void;
}

export const MealForm = ({ onSubmit, initialMeal, onCancel }: MealFormProps) => {
  const [meal, setMeal] = useState({
    meal_name: initialMeal?.meal_name || "",
    calories: initialMeal?.calories?.toString() || "",
  });
  const [previousMeals, setPreviousMeals] = useState<MealLog[]>([]);

  useEffect(() => {
    const fetchPreviousMeals = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user.id) return;

      console.log('Fetching previous meals for user:', session.session.user.id);
      const { data, error } = await supabase
        .from('meal_logs')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching previous meals:', error);
        return;
      }

      // Get unique meals by name and calories
      const uniqueMeals = data.reduce((acc: MealLog[], current) => {
        const exists = acc.some(
          meal => meal.meal_name === current.meal_name && meal.calories === current.calories
        );
        if (!exists) {
          acc.push(current);
        }
        return acc;
      }, []);

      console.log('Fetched unique previous meals:', uniqueMeals);
      setPreviousMeals(uniqueMeals);
    };

    fetchPreviousMeals();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meal.meal_name || !meal.calories) {
      return;
    }

    onSubmit({
      meal_name: meal.meal_name,
      calories: parseInt(meal.calories),
    });
  };

  const handlePreviousMealSelect = (mealId: string) => {
    const selectedMeal = previousMeals.find(m => m.id === mealId);
    if (selectedMeal) {
      console.log('Selected previous meal:', selectedMeal);
      setMeal({
        meal_name: selectedMeal.meal_name,
        calories: selectedMeal.calories.toString(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {previousMeals.length > 0 && (
        <div>
          <Select onValueChange={handlePreviousMealSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a previous meal" />
            </SelectTrigger>
            <SelectContent>
              {previousMeals.map((prevMeal) => (
                <SelectItem 
                  key={prevMeal.id} 
                  value={prevMeal.id}
                  className="hover:bg-[#0EA5E9] hover:text-white data-[highlighted]:bg-[#0EA5E9] data-[highlighted]:text-white"
                >
                  {prevMeal.meal_name} ({prevMeal.calories} cal)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div>
        <Input
          placeholder="Meal name"
          value={meal.meal_name}
          onChange={(e) => setMeal({ ...meal, meal_name: e.target.value })}
        />
      </div>
      <div>
        <Input
          type="number"
          placeholder="Calories"
          value={meal.calories}
          onChange={(e) => setMeal({ ...meal, calories: e.target.value })}
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="w-full">
          {initialMeal ? "Update Meal" : "Add Meal"}
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