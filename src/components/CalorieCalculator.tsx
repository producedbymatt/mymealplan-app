import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ACTIVITY_LEVELS, ActivityLevelKey } from "./calories/constants";
import { 
  calculateBMR, 
  calculateDailyCalories, 
  calculateProteinNeeds,
  getWeightChangeWarning 
} from "./calories/utils";
import ActivityLevelSelector from "./calories/ActivityLevelSelector";
import CalorieResults from "./calories/CalorieResults";
import { useActivityLevel } from "./calories/hooks/useActivityLevel";

interface CalorieCalculatorProps {
  height: number;
  currentWeight: number;
  targetWeight: number;
  targetDays: number;
  onCaloriesCalculated?: (calories: number) => void;
  onSaveMetrics?: () => void;
}

const CalorieCalculator = ({ 
  height, 
  currentWeight, 
  targetWeight, 
  targetDays,
  onCaloriesCalculated,
  onSaveMetrics 
}: CalorieCalculatorProps) => {
  const {
    activityLevel,
    selectedActivityKey,
    isLoading,
    hasUnsavedChanges,
    savedCalories,
    handleActivityChange,
    saveActivityLevel
  } = useActivityLevel(
    height,
    currentWeight,
    targetWeight,
    targetDays,
    onCaloriesCalculated,
    onSaveMetrics
  );

  const bmr = calculateBMR(currentWeight, height);
  const dailyCalories = hasUnsavedChanges 
    ? calculateDailyCalories(bmr, activityLevel, targetWeight, currentWeight, targetDays)
    : (savedCalories || calculateDailyCalories(bmr, activityLevel, targetWeight, currentWeight, targetDays));
  
  const weightDifference = targetWeight - currentWeight;
  const isGainingWeight = weightDifference > 0;
  const weeklyChange = Math.abs((weightDifference / targetDays) * 7);
  const { minProtein, maxProtein } = calculateProteinNeeds(targetWeight, activityLevel);
  const weightChangeWarning = getWeightChangeWarning(weeklyChange, isGainingWeight);

  const handleSave = async () => {
    const calculatedCalories = calculateDailyCalories(
      bmr,
      activityLevel,
      targetWeight,
      currentWeight,
      targetDays
    );
    await saveActivityLevel(calculatedCalories);
  };

  useEffect(() => {
    onCaloriesCalculated?.(dailyCalories);
  }, [dailyCalories, onCaloriesCalculated]);

  if (isLoading) {
    return null;
  }

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Calorie Analysis</h2>
      
      <div className="space-y-4">
        <ActivityLevelSelector
          selectedActivityKey={selectedActivityKey}
          onActivityChange={handleActivityChange}
        />

        {hasUnsavedChanges && (
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950"
            >
              Save Activity Level
            </Button>
          </div>
        )}

        <CalorieResults
          dailyCalories={dailyCalories}
          minProtein={minProtein}
          maxProtein={maxProtein}
          targetWeight={targetWeight}
          targetDays={targetDays}
          weeklyChange={weeklyChange}
          warningMessage={weightChangeWarning.message}
          warningColor={weightChangeWarning.color}
          bmr={bmr}
          activityLevel={activityLevel}
          selectedActivityKey={selectedActivityKey}
        />
      </div>
    </Card>
  );
};

export default CalorieCalculator;