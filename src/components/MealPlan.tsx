import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import MealTimeSlot from "./meal-plan/MealTimeSlot";
import { mealOptionsPool } from "./meal-plan/mealData";
import { MealTimeSlot as MealTimeSlotType, Meal } from "./meal-plan/types";

interface MealPlanProps {
  dailyCalories?: number;
  minProtein?: number;
  maxProtein?: number;
}

// Helper function to scale a meal's ingredients and macros
const scaleMeal = (originalMeal: Meal, targetCalories: number): Meal => {
  const scaleFactor = targetCalories / originalMeal.calories;
  let totalCalories = 0;
  
  // Scale the ingredients and calculate total calories
  const scaledIngredients = originalMeal.recipe.ingredients.map(ingredient => {
    const [amount, unit, ...rest] = ingredient.split(" ");
    const calorieMatch = ingredient.match(/\((\d+) cal\)/);
    if (!calorieMatch) return ingredient;
    
    const originalCalories = parseInt(calorieMatch[1]);
    const scaledCalories = Math.round(originalCalories * scaleFactor);
    totalCalories += scaledCalories;
    const scaledAmount = parseFloat(amount) * scaleFactor;
    
    // Format the scaled amount to 1 decimal place if it's not a whole number
    const formattedAmount = Number.isInteger(scaledAmount) 
      ? scaledAmount.toString() 
      : scaledAmount.toFixed(1);
    
    return `${formattedAmount} ${unit} ${rest.join(" ").replace(/\(\d+ cal\)/, `(${scaledCalories} cal)`)}`;
  });

  // Use the actual sum of scaled ingredient calories
  return {
    ...originalMeal,
    calories: totalCalories, // This ensures the total matches ingredient sum exactly
    protein: Math.round(originalMeal.protein * scaleFactor),
    carbs: Math.round(originalMeal.carbs * scaleFactor),
    fat: Math.round(originalMeal.fat * scaleFactor),
    recipe: {
      ...originalMeal.recipe,
      ingredients: scaledIngredients
    }
  };
};

const MealPlan = ({ dailyCalories = 1200, minProtein = 0, maxProtein = 999 }: MealPlanProps) => {
  const [mealPlan, setMealPlan] = useState<MealTimeSlotType[]>([]);
  const { toast } = useToast();

  // Function to generate new meal options that meet the protein requirements
  const generateMealOptions = (caloriesPerMeal: number) => {
    return [...mealOptionsPool]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(meal => {
        const scaledMeal = scaleMeal(meal, caloriesPerMeal);
        console.log(`Scaled meal ${meal.name}:`, {
          calories: scaledMeal.calories,
          protein: scaledMeal.protein
        });
        return scaledMeal;
      });
  };

  // Update meal plan when calories or protein targets change
  useEffect(() => {
    console.log('Updating meal plan with new targets:', {
      dailyCalories,
      minProtein,
      maxProtein
    });

    const caloriesPerMeal = dailyCalories / 2;
    const newMealPlan = [
      {
        time: "12:00 PM - 2:00 PM",
        options: generateMealOptions(caloriesPerMeal)
      },
      {
        time: "4:00 PM - 6:00 PM",
        options: generateMealOptions(caloriesPerMeal)
      }
    ];

    setMealPlan(newMealPlan);

    toast({
      title: "Meal plan updated",
      description: `Adjusted for ${dailyCalories} calories and ${minProtein}-${maxProtein}g protein target.`,
    });
  }, [dailyCalories, minProtein, maxProtein, toast]);

  const refreshMealOptions = (timeSlotIndex: number) => {
    console.log(`Refreshing meal options for time slot ${timeSlotIndex}`);
    const caloriesPerMeal = dailyCalories / 2;
    
    setMealPlan((currentPlan) => {
      const newPlan = [...currentPlan];
      const newOptions = generateMealOptions(caloriesPerMeal);
      
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