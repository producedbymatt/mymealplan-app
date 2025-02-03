import { useState, useEffect } from "react";
import { MealTimeSlot, Meal } from "../types";
import { getMealOptionsForTime } from "../mealData";
import { supabase } from "@/lib/supabase";

// Define interface for the recipe data from Supabase
interface RecipeData {
  recipe_id: string;
  recipes: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: string[];
    instructions: string[];
    prep_time: string;
    cook_time: string;
  };
}

export const useMealPlanState = (dailyCalories: number = 1200) => {
  const [mealPlan, setMealPlan] = useState<MealTimeSlot[]>([]);
  const [usedRecipes, setUsedRecipes] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [favoriteMeals, setFavoriteMeals] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id);
      if (session?.user?.id) {
        await loadFavoriteMeals(session.user.id);
      }
    };
    getSession();
  }, []);

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

      const favoriteNames = new Set(data.map(item => item.recipes.name));
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
      
      // First get the recipe ID from the recipes table
      const { data: recipeData, error: recipeError } = await supabase
        .from('recipes')
        .select('id')
        .eq('name', meal.name)
        .single();

      if (recipeError) {
        console.error('Error finding recipe:', recipeError);
        return;
      }

      // Then add to user_favorite_recipes
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
      
      // Update the meal plan to reflect the new favorite status
      setMealPlan(currentPlan => 
        currentPlan.map(slot => ({
          ...slot,
          options: slot.options.map(option => 
            option.name === meal.name 
              ? { ...option, isFavorite: true }
              : option
          )
        }))
      );
    } catch (err) {
      console.error('Error in addFavoriteMeal:', err);
    }
  };

  const removeFavoriteMeal = async (mealName: string) => {
    if (!userId) return;
    
    try {
      console.log('Removing meal from favorites:', mealName);
      
      // First get the recipe ID
      const { data: recipeData, error: recipeError } = await supabase
        .from('recipes')
        .select('id')
        .eq('name', mealName)
        .single();

      if (recipeError) {
        console.error('Error finding recipe:', recipeError);
        return;
      }

      // Then remove from user_favorite_recipes
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

      // Update the meal plan to reflect the removed favorite status
      setMealPlan(currentPlan => 
        currentPlan.map(slot => ({
          ...slot,
          options: slot.options.map(option => 
            option.name === mealName 
              ? { ...option, isFavorite: false }
              : option
          )
        }))
      );
    } catch (err) {
      console.error('Error in removeFavoriteMeal:', err);
    }
  };

  const generateMealOptions = async (
    timeSlot: string, 
    caloriesPerMeal: number, 
    excludeNames: Set<string>, 
    count: number = 2
  ): Promise<Meal[]> => {
    try {
      const allOptions = await getMealOptionsForTime(timeSlot);
      console.log(`Retrieved ${allOptions.length} options for ${timeSlot}`);
      
      const availableOptions = allOptions.filter(meal => !excludeNames.has(meal.name));
      
      if (availableOptions.length === 0) {
        console.log('No unique recipes available, resetting used recipes list');
        setUsedRecipes(new Set());
        return allOptions.length > 0 
          ? [{ ...allOptions[0], isFavorite: favoriteMeals.has(allOptions[0].name) }]
          : [];
      }

      const selectedMeals: Meal[] = [];
      const tempAvailable = [...availableOptions];
      
      for (let i = 0; i < count && tempAvailable.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * tempAvailable.length);
        const selectedMeal = {
          ...tempAvailable[randomIndex],
          isFavorite: favoriteMeals.has(tempAvailable[randomIndex].name)
        };
        selectedMeals.push(selectedMeal);
        tempAvailable.splice(randomIndex, 1);
      }

      return selectedMeals;
    } catch (error) {
      console.error('Error generating meal options:', error);
      return [];
    }
  };

  useEffect(() => {
    const initializeMealPlan = async () => {
      console.log('Initializing meal plan with calories:', dailyCalories);
      setIsLoading(true);
      const caloriesPerMeal = Math.round(dailyCalories / 3);
      const timeSlots = ["Breakfast", "Lunch", "Dinner"];
      
      try {
        const newMealPlan = await Promise.all(timeSlots.map(async time => {
          const options = await generateMealOptions(time, caloriesPerMeal, new Set(), 2);
          options.forEach(meal => {
            setUsedRecipes(prev => new Set([...prev, meal.name]));
          });
          return { time, options };
        }));

        setMealPlan(newMealPlan);
      } catch (error) {
        console.error('Error initializing meal plan:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeMealPlan();
  }, [dailyCalories]);

  return {
    mealPlan,
    setMealPlan,
    usedRecipes,
    setUsedRecipes,
    showFavoritesOnly,
    setShowFavoritesOnly,
    userId,
    generateMealOptions,
    favoriteMeals,
    addFavoriteMeal,
    removeFavoriteMeal,
    isLoading
  };
};