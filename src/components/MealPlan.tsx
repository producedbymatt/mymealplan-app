import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import MealTimeSlot from "./meal-plan/MealTimeSlot";
import { mealOptionsPool } from "./meal-plan/mealData";
import { MealTimeSlot as MealTimeSlotType } from "./meal-plan/types";

interface MealPlanProps {
  dailyCalories?: number;
}

const MealPlan = ({ dailyCalories = 1200 }: MealPlanProps) => {
  const [mealPlan, setMealPlan] = useState<MealTimeSlotType[]>(() => {
    const caloriesPerMeal = dailyCalories / 2;
    return [
      {
        time: "12:00 PM - 2:00 PM",
        options: mealOptionsPool.slice(0, 3).map(meal => ({
          ...meal,
          calories: Math.round(caloriesPerMeal),
          protein: Math.round(meal.protein * (caloriesPerMeal / meal.calories)),
          carbs: Math.round(meal.carbs * (caloriesPerMeal / meal.calories)),
          fat: Math.round(meal.fat * (caloriesPerMeal / meal.calories))
        }))
      },
      {
        time: "4:00 PM - 6:00 PM",
        options: mealOptionsPool.slice(3, 6).map(meal => ({
          ...meal,
          calories: Math.round(caloriesPerMeal),
          protein: Math.round(meal.protein * (caloriesPerMeal / meal.calories)),
          carbs: Math.round(meal.carbs * (caloriesPerMeal / meal.calories)),
          fat: Math.round(meal.fat * (caloriesPerMeal / meal.calories))
        }))
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
        .map(meal => ({
          ...meal,
          calories: Math.round(caloriesPerMeal),
          protein: Math.round(meal.protein * (caloriesPerMeal / meal.calories)),
          carbs: Math.round(meal.carbs * (caloriesPerMeal / meal.calories)),
          fat: Math.round(meal.fat * (caloriesPerMeal / meal.calories))
        }));
      
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