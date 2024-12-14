import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealTimeSlot {
  time: string;
  options: Meal[];
}

const mealPlan: MealTimeSlot[] = [
  {
    time: "12:00 PM - 2:00 PM",
    options: [
      {
        name: "Grilled Chicken Salad",
        calories: 350,
        protein: 35,
        carbs: 15,
        fat: 20,
      },
      {
        name: "Quinoa Buddha Bowl",
        calories: 400,
        protein: 15,
        carbs: 65,
        fat: 15,
      },
      {
        name: "Turkey Wrap",
        calories: 380,
        protein: 25,
        carbs: 45,
        fat: 18,
      },
    ],
  },
  {
    time: "4:00 PM - 6:00 PM",
    options: [
      {
        name: "Baked Salmon with Vegetables",
        calories: 450,
        protein: 40,
        carbs: 25,
        fat: 25,
      },
      {
        name: "Vegetarian Stir-Fry",
        calories: 380,
        protein: 18,
        carbs: 55,
        fat: 15,
      },
      {
        name: "Lean Beef with Sweet Potato",
        calories: 420,
        protein: 35,
        carbs: 40,
        fat: 20,
      },
    ],
  },
];

const MealPlan = () => {
  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Today's Meal Plan</h2>
      <p className="text-gray-600 mb-6">
        Following intermittent fasting schedule (12 PM - 6 PM eating window)
      </p>
      {mealPlan.map((slot, index) => (
        <div key={slot.time} className="mb-6">
          <h3 className="text-xl font-semibold mb-3">{slot.time}</h3>
          <div className="grid gap-4">
            {slot.options.map((meal, mealIndex) => (
              <div
                key={mealIndex}
                className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{meal.name}</h4>
                  <Badge variant="secondary">{meal.calories} cal</Badge>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>Protein: {meal.protein}g</span>
                  <span>Carbs: {meal.carbs}g</span>
                  <span>Fat: {meal.fat}g</span>
                </div>
              </div>
            ))}
          </div>
          {index < mealPlan.length - 1 && <Separator className="mt-6" />}
        </div>
      ))}
    </Card>
  );
};

export default MealPlan;