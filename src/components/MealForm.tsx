import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MealLog } from "@/hooks/useMealLogs";

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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