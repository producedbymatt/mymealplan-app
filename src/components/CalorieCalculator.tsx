import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ActivityLevelSlider } from "./calories/ActivityLevelSlider";
import { 
  calculateDailyCalories, 
  calculateProteinNeeds,
  getWeightChangeWarning 
} from "./calories/CalorieCalculations";

interface CalorieCalculatorProps {
  height: number;
  currentWeight: number;
  targetWeight: number;
  targetDays: number;
  onCaloriesCalculated?: (calories: number) => void;
}

const CalorieCalculator = ({ 
  height, 
  currentWeight, 
  targetWeight, 
  targetDays,
  onCaloriesCalculated 
}: CalorieCalculatorProps) => {
  const [activityLevel, setActivityLevel] = useState(1.2);

  const handleActivityLevelChange = (level: number) => {
    setActivityLevel(level);
  };

  const dailyCalories = calculateDailyCalories({
    currentWeight,
    height,
    activityLevel,
    targetWeight,
    targetDays
  });

  const weightDifference = targetWeight - currentWeight;
  const isGainingWeight = weightDifference > 0;
  const weeklyChange = Math.abs((weightDifference / targetDays) * 7);
  const { minProtein, maxProtein } = calculateProteinNeeds(targetWeight, activityLevel);
  const weightChangeWarning = getWeightChangeWarning(weeklyChange, isGainingWeight);

  useEffect(() => {
    onCaloriesCalculated?.(dailyCalories);
  }, [dailyCalories, onCaloriesCalculated]);

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Calorie Analysis</h2>
      
      <ActivityLevelSlider
        height={height}
        currentWeight={currentWeight}
        targetWeight={targetWeight}
        targetDays={targetDays}
        onActivityLevelChange={handleActivityLevelChange}
      />

      <div className="space-y-4">
        <div className="text-center">
          <p className="text-lg font-semibold">
            Recommended Daily Calories:
            <span className="block text-2xl text-green-600">{dailyCalories} calories</span>
          </p>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold">
            Daily Protein Target:
            <span className="block text-2xl text-blue-600">{minProtein}-{maxProtein}g</span>
          </p>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-center">
            To reach your goal weight of {targetWeight} lbs in {targetDays} days, you should aim to {isGainingWeight ? 'gain' : 'lose'} approximately{" "}
            <span className="font-semibold">{weeklyChange.toFixed(1)} lbs per week</span>
          </p>
          <p className={`text-sm text-center mt-2 ${weightChangeWarning.color}`}>
            {weightChangeWarning.message}
          </p>
        </div>

        <div className="text-xs text-gray-500 text-center mt-2">
          * Adjust your intake based on how you feel and your progress. These are general guidelines.
        </div>
      </div>
    </Card>
  );
};

export default CalorieCalculator;