import { Meal } from "./types";
import { supabase } from "@/lib/supabase";

export const getMealOptionsForTime = async (time: string): Promise<Meal[]> => {
  const mealType = time.toLowerCase();
  
  console.log('Getting meal options for time:', time, 'mapped to meal type:', mealType);
  
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('meal_type', mealType)
      .order('name');

    if (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }

    console.log(`Found ${data?.length} recipes for meal type ${mealType}`);
    
    // Transform the data to match the Meal type
    const meals = data.map(recipe => ({
      name: recipe.name,
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fat: recipe.fat,
      recipe: {
        ingredients: recipe.ingredients as string[],
        instructions: recipe.instructions as string[],
        prepTime: recipe.prep_time,
        cookTime: recipe.cook_time
      }
    }));

    return meals;
  } catch (error) {
    console.error('Error in getMealOptionsForTime:', error);
    return [];
  }
};