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

  const generateMealOptions = (timeSlot: string, caloriesPerMeal: number, excludeNames: Set<string>, count: number = 2) => {
    const allOptions = getMealOptionsForTime(timeSlot);
    const availableOptions = allOptions.filter(meal => !excludeNames.has(meal.name));
    
    if (availableOptions.length === 0) {
      console.log('No unique recipes available, resetting used recipes list');
      setUsedRecipes(new Set());
      return [scaleMeal(allOptions[Math.floor(Math.random() * allOptions.length)], caloriesPerMeal)];
    }

    // Get multiple random meals
    const selectedMeals: Meal[] = [];
    const tempAvailable = [...availableOptions];
    
    for (let i = 0; i < count && tempAvailable.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * tempAvailable.length);
      const selectedMeal = tempAvailable[randomIndex];
      selectedMeals.push(scaleMeal(selectedMeal, caloriesPerMeal));
      tempAvailable.splice(randomIndex, 1);
    }

    return selectedMeals;
  };

  // Update meal plan when calories change
  useEffect(() => {
    console.log('Updating meal plan with new calories:', dailyCalories);
    const caloriesPerMeal = Math.round(dailyCalories / 3);
    const timeSlots = ["Breakfast", "Lunch", "Dinner"];
    
    setUsedRecipes(new Set());
    
    const newMealPlan = timeSlots.map(time => {
      const options = generateMealOptions(time, caloriesPerMeal, new Set(), 2);
      options.forEach(meal => {
        setUsedRecipes(prev => new Set([...prev, meal.name]));
      });
      return { time, options };
    });

    setMealPlan(newMealPlan);
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
    removeFavoriteMeal
  };
};