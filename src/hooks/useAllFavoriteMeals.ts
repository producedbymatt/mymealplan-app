import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Meal } from "@/components/meal-plan/types";

// Define types for the database response
type RecipeResponse = {
  recipe_id: string;
  recipes: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    prep_time: string;
    cook_time: string;
    ingredients: string[];
    instructions: string[];
    meal_type: string;
  };
};

export const useAllFavoriteMeals = (userId?: string) => {
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        console.log('Loading all favorite meals for user:', userId);
        const { data, error } = await supabase
          .from('user_favorite_recipes')
          .select(`
            recipe_id,
            recipes (
              name,
              calories,
              protein,
              carbs,
              fat,
              prep_time,
              cook_time,
              ingredients,
              instructions,
              meal_type
            )
          `)
          .eq('user_id', userId);

        if (error) {
          console.error('Error loading favorite meals:', error);
          return;
        }

        const meals = (data as RecipeResponse[])?.map(item => ({
          name: item.recipes.name,
          calories: item.recipes.calories,
          protein: item.recipes.protein,
          carbs: item.recipes.carbs,
          fat: item.recipes.fat,
          recipe: {
            ingredients: item.recipes.ingredients,
            instructions: item.recipes.instructions,
            prepTime: item.recipes.prep_time,
            cookTime: item.recipes.cook_time
          }
        })) || [];

        console.log('Loaded favorite meals:', meals);
        setFavoriteMeals(meals);
      } catch (err) {
        console.error('Exception while loading favorite meals:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [userId]);

  return { favoriteMeals, isLoading };
};