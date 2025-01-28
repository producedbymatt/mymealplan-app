import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { MealTimeSlot, Meal } from "../types";
import { getMealOptionsForTime } from "../mealData";
import { scaleMeal } from "../utils/mealScaling";

export const useMealPlanState = (dailyCalories: number = 1200) => {
  const [mealPlan, setMealPlan] = useState<MealTimeSlot[]>([]);
  const [usedRecipes, setUsedRecipes] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id);
      if (session?.user?.id) {
        loadFavoriteMeals(session.user.id);
      }
    };
    getSession();
  }, []);

  const loadFavoriteMeals = async (uid: string) => {
    try {
      console.log('Loading favorite meals for user:', uid);
      const { data, error } = await supabase
        .from('favorite_meals')
        .select('meal_data')
        .eq('user_id', uid);

      if (error) {
        console.error('Error loading favorite meals:', error);
        return;
      }

      const meals = data?.map(item => item.meal_data as Meal) || [];
      console.log('Loaded favorite meals:', meals);
      setFavoriteMeals(meals);
    } catch (err) {
      console.error('Error loading favorite meals:', err);
    }
  };

  const addFavoriteMeal = (meal: Meal) => {
    console.log('Adding meal to favorites:', meal);
    setFavoriteMeals(prev => [...prev, meal]);
  };

  const removeFavoriteMeal = (mealName: string) => {
    console.log('Removing meal from favorites:', mealName);
    setFavoriteMeals(prev => prev.filter(meal => meal.name !== mealName));
  };

  const generateMealOptions = async (timeSlot: string, caloriesPerMeal: number, excludeNames: Set<string>, count: number = 2): Promise<Meal[]> => {
    try {
      const allOptions = await getMealOptionsForTime(timeSlot);
      console.log(`Retrieved ${allOptions.length} options for ${timeSlot}`);
      
      const availableOptions = allOptions.filter(meal => !excludeNames.has(meal.name));
      
      if (availableOptions.length === 0) {
        console.log('No unique recipes available, resetting used recipes list');
        setUsedRecipes(new Set());
        return allOptions.length > 0 
          ? [scaleMeal(allOptions[Math.floor(Math.random() * allOptions.length)], caloriesPerMeal)]
          : [];
      }

      const selectedMeals: Meal[] = [];
      const tempAvailable = [...availableOptions];
      
      for (let i = 0; i < count && tempAvailable.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * tempAvailable.length);
        const selectedMeal = tempAvailable[randomIndex];
        selectedMeals.push(scaleMeal(selectedMeal, caloriesPerMeal));
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
      console.log('Updating meal plan with new calories:', dailyCalories);
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