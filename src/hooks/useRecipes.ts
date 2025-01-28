import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Meal } from "@/components/meal-plan/types";

export const useRecipes = (mealType?: string) => {
  return useQuery({
    queryKey: ['recipes', mealType],
    queryFn: async () => {
      console.log('Fetching recipes from database for meal type:', mealType);
      let query = supabase.from('recipes').select('*');
      
      if (mealType) {
        query = query.eq('meal_type', mealType);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching recipes:', error);
        throw error;
      }

      console.log(`Found ${data?.length} recipes for meal type:`, mealType);
      return data as Meal[];
    }
  });
};