import { useState, useEffect } from "react";
import { MealTimeSlot, Meal } from "../types";
import { useFavoriteMealsState } from "./useFavoriteMealsState";
import { useMealGeneration } from "./useMealGeneration";
import { supabase } from "@/lib/supabase";

export const useMealPlanState = (dailyCalories: number = 1200) => {
  const [mealPlan, setMealPlan] = useState<MealTimeSlot[]>([]);
  const [usedRecipes, setUsedRecipes] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const { favoriteMeals, addFavoriteMeal, removeFavoriteMeal } = useFavoriteMealsState(userId);
  const { generateMealOptions } = useMealGeneration();

  useEffect(() => {
    const initializeMealPlan = async () => {
      console.log('Initializing meal plan with calories:', dailyCalories);
      setIsLoading(true);
      const caloriesPerMeal = Math.round(dailyCalories / 3);
      const timeSlots = ["Breakfast", "Lunch", "Dinner"];
      
      try {
        // First, fetch full meal data for favorites
        const { data: favoriteMealData, error: favoritesError } = await supabase
          .from('recipes')
          .select('*')
          .in('name', Array.from(favoriteMeals));

        if (favoritesError) {
          console.error('Error fetching favorite meals:', favoritesError);
          return;
        }

        // Create a map of favorite meals by meal type
        const favoriteMealsByType = new Map<string, Meal[]>();
        favoriteMealData?.forEach(recipe => {
          // Normalize meal type to match our timeSlots format
          let mealType = recipe.meal_type.toLowerCase();
          if (mealType === 'breakfast' || mealType === 'morning') {
            mealType = 'breakfast';
          } else if (mealType === 'lunch' || mealType === 'afternoon') {
            mealType = 'lunch';
          } else if (mealType === 'dinner' || mealType === 'evening') {
            mealType = 'dinner';
          }

          const meal: Meal = {
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
          };

          const existingMeals = favoriteMealsByType.get(mealType) || [];
          favoriteMealsByType.set(mealType, [...existingMeals, meal]);
        });

        console.log('Favorite meals by type:', Object.fromEntries(favoriteMealsByType));

        const newMealPlan = await Promise.all(timeSlots.map(async time => {
          // Get regular meal options
          const options = await generateMealOptions(time, caloriesPerMeal, new Set(), 2);
          
          // Get favorites for this time slot
          const mealType = time.toLowerCase();
          console.log(`Looking for favorites with meal type: ${mealType}`);
          const favoritesForTimeSlot = favoriteMealsByType.get(mealType) || [];
          console.log(`Found ${favoritesForTimeSlot.length} favorites for ${time}`);
          
          // Filter out duplicates between regular options and favorites
          const uniqueFavorites = favoritesForTimeSlot.filter(
            favorite => !options.some(option => option.name === favorite.name)
          );

          console.log(`Time slot ${time}: Regular options: ${options.length}, Favorites: ${uniqueFavorites.length}`);

          // Combine regular options with favorites
          const combinedOptions = [...options, ...uniqueFavorites];
          
          // Update used recipes
          combinedOptions.forEach(meal => {
            setUsedRecipes(prev => new Set([...prev, meal.name]));
          });

          return { time, options: combinedOptions };
        }));

        console.log('Setting meal plan with options:', newMealPlan);
        setMealPlan(newMealPlan);
      } catch (error) {
        console.error('Error initializing meal plan:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeMealPlan();
  }, [dailyCalories, favoriteMeals]);

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