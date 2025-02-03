import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MealLog } from "@/hooks/useMealLogs";
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
  onSubmit: (meal: { meal_name: string; calories: number }) => void;
  initialMeal?: MealLog;
  onCancel?: () => void;
  submitButtonText?: string;
}

export const MealForm = ({ onSubmit, initialMeal, onCancel, submitButtonText }: MealFormProps) => {
  const [meal, setMeal] = useState({
    meal_name: initialMeal?.meal_name || "",
    calories: initialMeal?.calories?.toString() || "",
  });
  const [previousMeals, setPreviousMeals] = useState<MealLog[]>([]);

  // Reset form when initialMeal changes
  useEffect(() => {
    setMeal({
      meal_name: initialMeal?.meal_name || "",
      calories: initialMeal?.calories?.toString() || "",
    });
  }, [initialMeal]);

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

      // Sort meals: most recent first, then alphabetically
      const mostRecent = uniqueMeals[0]; // Keep the most recent meal
      const otherMeals = uniqueMeals.slice(1).sort((a, b) => 
        a.meal_name.localeCompare(b.meal_name)
      );

      const sortedMeals = mostRecent ? [mostRecent, ...otherMeals] : otherMeals;

      console.log('Fetched and sorted unique previous meals:', sortedMeals);
      setPreviousMeals(sortedMeals);
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

    // Only reset if not editing
    if (!initialMeal) {
      setMeal({
        meal_name: "",
        calories: "",
      });
    }
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

  const handleDeleteMeal = async (mealId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering select item click
    
    try {
      // Delete all meals with the same name and calories as the selected meal
      const mealToDelete = previousMeals.find(m => m.id === mealId);
      if (!mealToDelete) {
        console.error('Meal not found:', mealId);
        return;
      }

      console.log('Deleting all instances of meal:', mealToDelete);
      
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user.id) {
        console.error('No user session found');
        return;
      }

      const { error } = await supabase
        .from('meal_logs')
        .delete()
        .eq('user_id', session.session.user.id)
        .eq('meal_name', mealToDelete.meal_name)
        .eq('calories', mealToDelete.calories);

      if (error) {
        console.error('Error deleting meals:', error);
        toast.error("Failed to delete meal");
        return;
      }

      // Update local state to remove all instances of the deleted meal
      setPreviousMeals(prevMeals => 
        prevMeals.filter(meal => 
          !(meal.meal_name === mealToDelete.meal_name && meal.calories === mealToDelete.calories)
        )
      );
      
      toast.success("Meal deleted successfully");
    } catch (err) {
      console.error('Error in handleDeleteMeal:', err);
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
                      <Badge variant="secondary" className="ml-2 shrink-0">
                        Recent
                      </Badge>
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