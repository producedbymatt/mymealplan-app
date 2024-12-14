import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import MealTimeSlot from "./meal-plan/MealTimeSlot";
import { mealOptionsPool } from "./meal-plan/mealData";
import { MealTimeSlot as MealTimeSlotType } from "./meal-plan/types";

const initialMealPlan: MealTimeSlotType[] = [
  {
    time: "12:00 PM - 2:00 PM",
    options: mealOptionsPool.slice(0, 3)
  },
  {
    time: "4:00 PM - 6:00 PM",
    options: mealOptionsPool.slice(3, 6)
  }
];

const MealPlan = () => {
  const [mealPlan, setMealPlan] = useState<MealTimeSlotType[]>(initialMealPlan);
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