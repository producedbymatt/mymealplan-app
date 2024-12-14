import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

// Additional meal options pool
const mealOptionsPool: Meal[] = [
  {
    name: "Greek Yogurt Bowl",
    calories: 320,
    protein: 20,
    carbs: 40,
    fat: 12,
  },
  {
    name: "Tuna Avocado Salad",
    calories: 390,
    protein: 28,
    carbs: 20,
    fat: 24,
  },
  {
    name: "Chicken Stir-Fry",
    calories: 410,
    protein: 32,
    carbs: 45,
    fat: 16,
  },
  {
    name: "Mediterranean Bowl",
    calories: 440,
    protein: 22,
    carbs: 58,
    fat: 18,
  },
  {
    name: "Tofu Veggie Bowl",
    calories: 360,
    protein: 20,
    carbs: 48,
    fat: 14,
  },
];

const initialMealPlan: MealTimeSlot[] = [
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
  const [mealPlan, setMealPlan] = useState<MealTimeSlot[]>(initialMealPlan);
  const { toast } = useToast();

  const refreshMealOptions = (timeSlotIndex: number) => {
    console.log(`Refreshing meal options for time slot ${timeSlotIndex}`);
    
    setMealPlan((currentPlan) => {
      const newPlan = [...currentPlan];
      const newOptions = [...mealOptionsPool]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
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
        <div key={slot.time} className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold">{slot.time}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refreshMealOptions(index)}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Options
            </Button>
          </div>
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