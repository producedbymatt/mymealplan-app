import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import MealTimeSlot from "./meal-plan/MealTimeSlot";
import { mealOptionsPool } from "./meal-plan/mealData";
import { MealTimeSlot as MealTimeSlotType, Meal } from "./meal-plan/types";

interface MealPlanProps {
  dailyCalories?: number;
}

// Helper function to scale a meal's ingredients and macros
const scaleMeal = (originalMeal: Meal, targetCalories: number): Meal => {
  const scaleFactor = targetCalories / originalMeal.calories;
  
  // Scale the ingredients
  const scaledIngredients = originalMeal.recipe.ingredients.map(ingredient => {
    const [amount, unit, ...rest] = ingredient.split(" ");
    const calorieMatch = ingredient.match(/\((\d+) cal\)/);
    if (!calorieMatch) return ingredient;
    
    const originalCalories = parseInt(calorieMatch[1]);
    const scaledCalories = Math.round(originalCalories * scaleFactor);
    const scaledAmount = parseFloat(amount) * scaleFactor;
    
    // Format the scaled amount to 1 decimal place if it's not a whole number
    const formattedAmount = Number.isInteger(scaledAmount) 
      ? scaledAmount.toString() 
      : scaledAmount.toFixed(1);
    
    return `${formattedAmount} ${unit} ${rest.join(" ").replace(/\(\d+ cal\)/, `(${scaledCalories} cal)`)}`;
  });

  return {
    ...originalMeal,
    calories: Math.round(targetCalories),
    protein: Math.round(originalMeal.protein * scaleFactor),
    carbs: Math.round(originalMeal.carbs * scaleFactor),
    fat: Math.round(originalMeal.fat * scaleFactor),
    recipe: {
      ...originalMeal.recipe,
      ingredients: scaledIngredients
    }
  };
};

const MealPlan = ({ dailyCalories = 1200 }: MealPlanProps) => {
  const [mealPlan, setMealPlan] = useState<MealTimeSlotType[]>(() => {
    const caloriesPerMeal = dailyCalories / 2;
    return [
      {
        time: "12:00 PM - 2:00 PM",
        options: mealOptionsPool.slice(0, 3).map(meal => scaleMeal(meal, caloriesPerMeal))
      },
      {
        time: "4:00 PM - 6:00 PM",
        options: mealOptionsPool.slice(3, 6).map(meal => scaleMeal(meal, caloriesPerMeal))
      }
    ];
  });
  const { toast } = useToast();

  const refreshMealOptions = (timeSlotIndex: number) => {
    console.log(`Refreshing meal options for time slot ${timeSlotIndex}`);
    const caloriesPerMeal = dailyCalories / 2;
    
    setMealPlan((currentPlan) => {
      const newPlan = [...currentPlan];
      const newOptions = [...mealOptionsPool]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(meal => scaleMeal(meal, caloriesPerMeal));
      
      newPlan[timeSlotIndex] = {
        ...newPlan[timeSlotIndex],
        options: newOptions,
      };
      
      return newPlan;
    });

    toast({
      title: "Meal options refreshed",
      description: "New meal suggestions have been generated.",
    });
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Today's Meal Plan</h2>
      <p className="text-gray-600 mb-6">
        Following intermittent fasting schedule (12 PM - 6 PM eating window)
      </p>
      {mealPlan.map((slot, index) => (
        <MealTimeSlot
          key={slot.time}
          time={slot.time}
          options={slot.options}
          onRefresh={() => refreshMealOptions(index)}
          isLast={index === mealPlan.length - 1}
        />
      ))}
    </Card>
  );
};

export default MealPlan;