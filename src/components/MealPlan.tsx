import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import MealTimeSlot from "./meal-plan/MealTimeSlot";
import { getMealOptionsForTime } from "./meal-plan/mealData";
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
    const parts = ingredient.split(" ");
    const amount = parseFloat(parts[0]);
    if (isNaN(amount)) return ingredient; // Skip scaling if amount is not a number
    
    const unit = parts[1];
    const calorieMatch = ingredient.match(/\((\d+) cal\)/);
    if (!calorieMatch) return ingredient;
    
    const originalCalories = parseInt(calorieMatch[1]);
    const scaledCalories = Math.round(originalCalories * scaleFactor);
    totalCalories += scaledCalories;
    
    // Calculate scaled amount and handle potential floating point issues
    const scaledAmount = amount * scaleFactor;
    // Format the number to prevent excessive decimal places
    const formattedAmount = scaledAmount < 0.1 
      ? scaledAmount.toFixed(2) 
      : scaledAmount < 1 
        ? scaledAmount.toFixed(1) 
        : Math.round(scaledAmount * 10) / 10;
    
    // Reconstruct the ingredient string with scaled values
    const remainingParts = parts.slice(2).join(" ").replace(/\(\d+ cal\)/, `(${scaledCalories} cal)`);
    return `${formattedAmount} ${unit} ${remainingParts}`;
  });

  // Use the actual sum of scaled ingredient calories
  return {
    ...originalMeal,
    calories: Math.round(totalCalories), // Round the total calories
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
  const [usedRecipes, setUsedRecipes] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Function to generate new meal options that meet the protein requirements
  const generateMealOptions = (timeSlot: string, caloriesPerMeal: number, excludeNames: Set<string>) => {
    const allOptions = getMealOptionsForTime(timeSlot);
    const availableOptions = allOptions.filter(meal => !excludeNames.has(meal.name));
    
    if (availableOptions.length < 3) {
      console.log('Not enough unique recipes available, resetting used recipes list');
      setUsedRecipes(new Set());
      return [...allOptions]
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
    }

    return [...availableOptions]
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

    const caloriesPerMeal = Math.round(dailyCalories / 3);
    const timeSlots = [
      "7:00 AM - 9:00 AM",
      "12:00 PM - 2:00 PM",
      "6:00 PM - 8:00 PM"
    ];
    
    // Reset used recipes when generating a new meal plan
    setUsedRecipes(new Set());
    
    const newMealPlan = timeSlots.map(time => {
      const options = generateMealOptions(time, caloriesPerMeal, new Set());
      // Add the new recipe names to usedRecipes
      options.forEach(meal => {
        setUsedRecipes(prev => new Set([...prev, meal.name]));
      });
      return { time, options };
    });

    setMealPlan(newMealPlan);

    toast({
      title: "Meal plan updated",
      description: `Adjusted for ${dailyCalories} calories and ${minProtein}-${maxProtein}g protein target.`,
    });
  }, [dailyCalories, minProtein, maxProtein, toast]);

  const refreshMealOptions = (timeSlotIndex: number) => {
    console.log(`Refreshing meal options for time slot ${timeSlotIndex}`);
    const caloriesPerMeal = Math.round(dailyCalories / 3);
    
    setMealPlan((currentPlan) => {
      const newPlan = [...currentPlan];
      const newOptions = generateMealOptions(
        newPlan[timeSlotIndex].time, 
        caloriesPerMeal,
        usedRecipes
      );
      
      // Add the new recipe names to usedRecipes
      newOptions.forEach(meal => {
        setUsedRecipes(prev => new Set([...prev, meal.name]));
      });
      
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
        Three balanced meals throughout the day
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