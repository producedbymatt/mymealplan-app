import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { subWeeks } from "date-fns";
import { toast } from "sonner";

export interface MealLog {
  id: string;
  user_id: string;
  meal_name: string;
  calories: number;
  created_at: string;
}

export const useMealLogs = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  const { data: mealLogs = [], isLoading } = useQuery({
    queryKey: ['meal-logs'],
    queryFn: async () => {
      console.log('Fetching meal logs for user:', userId);
      if (!userId) return [];
      
      const oneWeekAgo = subWeeks(new Date(), 1).toISOString();
      const { data, error } = await supabase
        .from('meal_logs')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', oneWeekAgo)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching meal logs:', error);
        throw error;
      }
      
      console.log('Fetched meal logs:', data);
      return data as MealLog[];
    },
    enabled: !!userId,
  });

  const addMealMutation = useMutation({
    mutationFn: async (meal: { meal_name: string; calories: number }) => {
      console.log('Adding meal:', meal);
      if (!userId) {
        console.error('No user ID provided');
        throw new Error('User not authenticated');
      }

      if (!meal.meal_name || !meal.calories) {
        console.error('Invalid meal data:', meal);
        throw new Error('Please provide both meal name and calories');
      }

      const { data, error } = await supabase
        .from('meal_logs')
        .insert([
          {
            user_id: userId,
            meal_name: meal.meal_name,
            calories: meal.calories,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase error adding meal:', error);
        throw new Error(error.message || 'Failed to add meal to database');
      }

      if (!data) {
        console.error('No data returned from insert');
        throw new Error('Failed to create meal entry');
      }

      console.log('Added meal successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-logs'] });
      toast.success("Meal logged successfully!");
    },
    onError: (error: Error) => {
      console.error('Mutation error:', error);
      const errorMessage = error.message || "An unexpected error occurred while logging meal";
      toast.error(errorMessage);
    },
  });

  const updateMealMutation = useMutation({
    mutationFn: async (meal: MealLog) => {
      console.log('Updating meal:', meal);
      const { data, error } = await supabase
        .from('meal_logs')
        .update({
          meal_name: meal.meal_name,
          calories: meal.calories,
        })
        .eq('id', meal.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating meal:', error);
        throw new Error(error.message || 'Failed to update meal in database');
      }

      console.log('Updated meal successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-logs'] });
      toast.success("Meal updated successfully!");
    },
    onError: (error: Error) => {
      const errorMessage = error.message || "An unexpected error occurred while updating meal";
      toast.error(errorMessage);
    },
  });

  const deleteMealMutation = useMutation({
    mutationFn: async (mealId: string) => {
      console.log('Deleting meal:', mealId);
      const { error } = await supabase
        .from('meal_logs')
        .delete()
        .eq('id', mealId);

      if (error) {
        console.error('Error deleting meal:', error);
        throw new Error(error.message || 'Failed to delete meal from database');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-logs'] });
      toast.success("Meal deleted successfully!");
    },
    onError: (error: Error) => {
      const errorMessage = error.message || "An unexpected error occurred while deleting meal";
      toast.error(errorMessage);
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