import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Meal } from "@/components/meal-plan/types";

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
          .from('favorite_meals')
          .select('meal_data')
          .eq('user_id', userId);

        if (error) {
          console.error('Error loading favorite meals:', error);
          return;
        }

        const meals = data?.map(item => item.meal_data as Meal) || [];
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