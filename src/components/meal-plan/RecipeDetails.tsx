import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MealForm } from "@/components/MealForm";
import { Meal } from "./types";
import { useState } from "react";
import { MealLog } from "@/hooks/useMealLogs";
import { useMealLogs } from "@/hooks/useMealLogs";
import { supabase } from "@/lib/supabase";

interface RecipeDetailsProps {
  meal: Meal;
}

const RecipeDetails = ({ meal }: RecipeDetailsProps) => {
  const [showMealForm, setShowMealForm] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();

  // Get the addMeal function from useMealLogs
  const { addMeal } = useMealLogs(userId);

  // Get current user on mount
  React.useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id);
    };
    getSession();
  }, []);

  const handleAddToLog = () => {
    setShowMealForm(true);
  };

  // Create a partial MealLog object for the form
  const initialMealLog: Partial<MealLog> = {
    id: '', // Empty string as it's a new entry
    meal_name: meal.name,
    calories: meal.calories,
    user_id: '', // This will be set by the form component
    created_at: new Date().toISOString(),
  };

  return (
    <div className="space-y-4 text-white">
      <div className="flex justify-between items-center">
        <h5 className="font-semibold mb-2">Preparation Time</h5>
        <Button
          variant="ghost"
          onClick={handleAddToLog}
          className="hover:bg-white/20 flex items-center gap-2 border border-white"
        >
          <Plus className="h-4 w-4" />
          <span>Log Meal</span>
        </Button>
      </div>
      <p className="text-sm">
        Prep: {meal.recipe.prepTime} | Cook: {meal.recipe.cookTime}
      </p>
      <div>
        <h5 className="font-semibold mb-2">Ingredients</h5>
        <ul className="list-disc list-inside text-sm space-y-1">
          {meal.recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div>
        <h5 className="font-semibold mb-2">Instructions</h5>
        <ol className="list-decimal list-inside text-sm space-y-1">
          {meal.recipe.instructions.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ol>
      </div>

      <Dialog open={showMealForm} onOpenChange={setShowMealForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Meal to Log</DialogTitle>
          </DialogHeader>
          <MealForm
            initialMeal={initialMealLog as MealLog}
            onSubmit={async (mealData) => {
              console.log('Adding meal to log:', mealData);
              if (addMeal) {
                await addMeal(mealData);
              }
              setShowMealForm(false);
            }}
            onCancel={() => setShowMealForm(false)}
            submitButtonText="Log Meal"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeDetails;