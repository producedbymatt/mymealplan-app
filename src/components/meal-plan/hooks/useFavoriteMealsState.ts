import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Meal } from "../types";

interface UserFavoriteRecipe {
  recipes: {
    name: string;
  };
}

export const useFavoriteMealsState = (userId?: string) => {
  const [favoriteMeals, setFavoriteMeals] = useState<Set<string>>(new Set());

  const loadFavoriteMeals = async (uid: string) => {
    try {
      console.log('Loading favorite meals for user:', uid);
      const { data, error } = await supabase
        .from('user_favorite_recipes')
        .select(`
          recipes (name)
        `)
        .eq('user_id', uid);

      if (error) {
        console.error('Error loading favorite meals:', error);
        return;
      }

      if (!data) {
        console.log('No favorite meals found');
        return;
      }

      // Type assertion and safe transformation
      const typedData = data as UserFavoriteRecipe[];
      const favoriteNames = new Set(
        typedData
          .map(item => item.recipes?.name)
          .filter((name): name is string => Boolean(name))
      );
      
      console.log('Loaded favorite meals:', favoriteNames);
      setFavoriteMeals(favoriteNames);
    } catch (err) {
      console.error('Error loading favorite meals:', err);
    }
  };

  const addFavoriteMeal = async (meal: Meal) => {
    if (!userId) return;
    
    try {
      console.log('Adding meal to favorites:', meal);
      
      const { data: recipeData, error: recipeError } = await supabase
        .from('recipes')
        .select('id')
        .eq('name', meal.name)
        .maybeSingle();

      if (recipeError || !recipeData) {
        console.error('Error finding recipe:', recipeError);
        return;
      }

      const { error } = await supabase
        .from('user_favorite_recipes')
        .insert({
          user_id: userId,
          recipe_id: recipeData.id
        });

      if (error) {
        console.error('Error adding favorite:', error);
        return;
      }

      setFavoriteMeals(prev => new Set([...prev, meal.name]));
    } catch (err) {
      console.error('Error in addFavoriteMeal:', err);
    }
  };

  const removeFavoriteMeal = async (mealName: string) => {
    if (!userId) return;
    
    try {
      console.log('Removing meal from favorites:', mealName);
      
      const { data: recipeData, error: recipeError } = await supabase
        .from('recipes')
        .select('id')
        .eq('name', mealName)
        .maybeSingle();

      if (recipeError || !recipeData) {
        console.error('Error finding recipe:', recipeError);
        return;
      }

      const { error } = await supabase
        .from('user_favorite_recipes')
        .delete()
        .eq('user_id', userId)
        .eq('recipe_id', recipeData.id);

      if (error) {
        console.error('Error removing favorite:', error);
        return;
      }

      setFavoriteMeals(prev => {
        const newSet = new Set(prev);
        newSet.delete(mealName);
        return newSet;
      });
    } catch (err) {
      console.error('Error in removeFavoriteMeal:', err);
    }
  };

  useEffect(() => {
    if (userId) {
      loadFavoriteMeals(userId);
    }
  }, [userId]);

  return {
    favoriteMeals,
    addFavoriteMeal,
    removeFavoriteMeal
  };
};