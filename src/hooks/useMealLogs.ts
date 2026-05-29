import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { subWeeks } from "date-fns";
import { toast } from "sonner";

export interface MealLog {
  id: string;
  user_id: string;
  meal_name: string;
  calories: number;
  protein: number;
  carbs: number;
  sugars: number;
  created_at: string;
}

export interface MealInput {
  meal_name: string;
  calories: number;
  protein: number;
  carbs: number;
  sugars: number;
}

export const useMealLogs = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  const { data: mealLogs = [], isLoading } = useQuery({
    queryKey: ['meal-logs'],
    queryFn: async () => {
      if (!userId) return [];

      const oneWeekAgo = subWeeks(new Date(), 1).toISOString();
      const { data, error } = await supabase
        .from('meal_logs')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', oneWeekAgo)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as MealLog[];
    },
    enabled: !!userId,
  });

  const addMealMutation = useMutation({
    mutationFn: async (meal: MealInput) => {
      if (!userId) throw new Error('User not authenticated');
      if (!meal.meal_name || meal.calories === undefined || meal.calories === null) {
        throw new Error('Please provide a meal name and calories');
      }

      const { data, error } = await supabase
        .from('meal_logs')
        .insert([{
          user_id: userId,
          meal_name: meal.meal_name,
          calories: meal.calories,
          protein: meal.protein ?? 0,
          carbs: meal.carbs ?? 0,
          sugars: meal.sugars ?? 0,
        }])
        .select()
        .single();

      if (error) throw new Error(error.message || 'Failed to add meal');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-logs'] });
      toast.success("Meal logged successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "An unexpected error occurred while logging meal");
    },
  });

  const updateMealMutation = useMutation({
    mutationFn: async (meal: MealLog) => {
      const { data, error } = await supabase
        .from('meal_logs')
        .update({
          meal_name: meal.meal_name,
          calories: meal.calories,
          protein: meal.protein,
          carbs: meal.carbs,
          sugars: meal.sugars,
        })
        .eq('id', meal.id)
        .select()
        .single();

      if (error) throw new Error(error.message || 'Failed to update meal');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-logs'] });
      toast.success("Meal updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "An unexpected error occurred while updating meal");
    },
  });

  const deleteMealMutation = useMutation({
    mutationFn: async (mealId: string) => {
      const { error } = await supabase
        .from('meal_logs')
        .delete()
        .eq('id', mealId);
      if (error) throw new Error(error.message || 'Failed to delete meal');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-logs'] });
      toast.success("Meal deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "An unexpected error occurred while deleting meal");
    },
  });

  return {
    mealLogs,
    isLoading,
    addMeal: addMealMutation.mutate,
    updateMeal: updateMealMutation.mutate,
    deleteMeal: deleteMealMutation.mutate,
  };
};
