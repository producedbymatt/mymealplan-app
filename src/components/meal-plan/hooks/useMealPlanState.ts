import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { MealTimeSlot } from "../types";
import { getMealOptionsForTime } from "../mealData";
import { scaleMeal } from "../utils/mealScaling";

export const useMealPlanState = (dailyCalories: number = 1200) => {
  const [mealPlan, setMealPlan] = useState<MealTimeSlot[]>([]);
  const [usedRecipes, setUsedRecipes] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();

  // Get current user on mount
  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id);
    };
    loadUser();
  }, []);

  const generateMealOptions = (timeSlot: string, caloriesPerMeal: number, excludeNames: Set<string>) => {
    const allOptions = getMealOptionsForTime(timeSlot);
    const availableOptions = allOptions.filter(meal => !excludeNames.has(meal.name));
    
    if (availableOptions.length < 3) {
      console.log('Not enough unique recipes available, resetting used recipes list');
      setUsedRecipes(new Set());
      return [...allOptions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(meal => scaleMeal(meal, caloriesPerMeal));
    }

    return [...availableOptions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(meal => scaleMeal(meal, caloriesPerMeal));
  };

  // Update meal plan when calories change
  useEffect(() => {
    console.log('Updating meal plan with new calories:', dailyCalories);
    const caloriesPerMeal = Math.round(dailyCalories / 3);
    const timeSlots = ["Breakfast", "Lunch", "Dinner"];
    
    setUsedRecipes(new Set());
    
    const newMealPlan = timeSlots.map(time => {
      const options = generateMealOptions(time, caloriesPerMeal, new Set());
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
    generateMealOptions
  };
};