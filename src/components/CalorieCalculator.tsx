import React from "react";
import { Card } from "@/components/ui/card";

interface CalorieCalculatorProps {
  height: number;
  currentWeight: number;
  targetWeight: number;
  targetDays: number;
}

const CalorieCalculator = ({ height, currentWeight, targetWeight, targetDays }: CalorieCalculatorProps) => {
  // Calculate BMR using Harris-Benedict equation (for standard units)
  const calculateBMR = () => {
    // Converting weight to kg and height to cm for the formula
    const weightInKg = currentWeight * 0.453592;
    const heightInCm = height * 2.54;
    
    // BMR formula for adults
    const bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * 30 + 5; // Assuming age 30 for simplicity
    console.log("Calculated BMR:", bmr);
    return bmr;
  };

  const calculateDailyCalories = () => {
    const bmr = calculateBMR();
    const tdee = bmr * 1.2; // Assuming sedentary lifestyle
    
    // Calculate required deficit
    const weightToLose = currentWeight - targetWeight;
    const caloriesPerDay = tdee - ((weightToLose * 3500) / targetDays);
    
    console.log("TDEE:", tdee);
    console.log("Target daily calories:", caloriesPerDay);
    
    return Math.max(1200, Math.round(caloriesPerDay)); // Never recommend below 1200 calories
  };

  const dailyCalories = calculateDailyCalories();
  const weightLossPerWeek = ((currentWeight - targetWeight) / targetDays) * 7;

  return (
    <Card className="p-6 w-full max-w-md mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Calorie Analysis</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-lg font-semibold">
            Recommended Daily Calories:
            <span className="block text-2xl text-green-600">{dailyCalories} calories</span>
          </p>
        </div>
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-center">
            To reach your goal weight of {targetWeight} lbs in {targetDays} days, you should aim to lose approximately{" "}
            <span className="font-semibold">{weightLossPerWeek.toFixed(1)} lbs per week</span>
          </p>
        </div>
        <div className="text-xs text-gray-500 text-center mt-2">
          * Calculations assume a sedentary lifestyle. Adjust your intake based on your activity level.
        </div>
      </div>
    </Card>
  );
};

export default CalorieCalculator;