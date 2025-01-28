import { Meal } from "./types";
import { supabase } from "@/lib/supabase";

export const getMealOptionsForTime = async (time: string): Promise<Meal[]> => {
  const mealType = time.toLowerCase().includes('breakfast') ? 'breakfast' 
    : time.toLowerCase().includes('lunch') ? 'lunch' 
    : 'dinner';

  console.log('Fetching meal options for time:', time, 'meal type:', mealType);
  
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('meal_type', mealType);

    if (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }

    console.log(`Found ${data?.length} recipes for meal type:`, mealType);
    return data as Meal[];
  } catch (error) {
    console.error('Error in getMealOptionsForTime:', error);
    return [];
  }
};