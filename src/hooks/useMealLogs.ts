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
      if (!userId) throw new Error('User not authenticated');

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
        console.error('Error adding meal:', error);
        throw new Error(error.message);
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
      toast.error(`Failed to log meal: ${error.message}`);
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
        throw new Error(error.message);
      }

      console.log('Updated meal successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-logs'] });
      toast.success("Meal updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update meal: ${error.message}`);
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
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-logs'] });
      toast.success("Meal deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete meal: ${error.message}`);
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