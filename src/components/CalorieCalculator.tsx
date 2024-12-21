import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { ACTIVITY_LEVELS, ActivityLevelKey } from "./calories/constants";
import { 
  calculateBMR, 
  calculateDailyCalories, 
  calculateProteinNeeds,
  getWeightChangeWarning 
} from "./calories/utils";
import ActivityLevelSelector from "./calories/ActivityLevelSelector";
import CalorieResults from "./calories/CalorieResults";

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
  const [activityLevel, setActivityLevel] = useState<number>(1.2);
  const [selectedActivityKey, setSelectedActivityKey] = useState<ActivityLevelKey>("sedentary");

  useEffect(() => {
    loadActivityLevel();
  }, []);

  const loadActivityLevel = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      console.log('Loading activity level for user:', user.id);
      const { data, error } = await supabase
        .from('user_metrics')
        .select('activity_level')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading activity level:', error);
        return;
      }

      if (data && data.length > 0 && data[0].activity_level) {
        const storedLevel = data[0].activity_level as ActivityLevelKey;
        console.log('Retrieved activity level from database:', storedLevel);
        setSelectedActivityKey(storedLevel);
        setActivityLevel(ACTIVITY_LEVELS[storedLevel].value);
      }
    } catch (err) {
      console.error('Error in loadActivityLevel:', err);
    }
  };

  const saveActivityLevel = async (level: ActivityLevelKey) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to save your activity level");
        return;
      }

      console.log('Attempting to save activity level:', level);
      const { error } = await supabase
        .from('user_metrics')
        .update({ 
          activity_level: level,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error saving activity level:', error);
        toast.error("Failed to save activity level");
        return;
      }

      console.log('Successfully saved activity level:', level);
      toast.success("Activity level updated");
    } catch (err) {
      console.error('Error in saveActivityLevel:', err);
      toast.error("An error occurred while saving");
    }
  };

  const handleActivityChange = async (value: ActivityLevelKey) => {
    console.log("Activity level changed to:", value);
    setSelectedActivityKey(value);
    setActivityLevel(ACTIVITY_LEVELS[value].value);
    await saveActivityLevel(value);
  };

  const bmr = calculateBMR(currentWeight, height);
  const dailyCalories = calculateDailyCalories(bmr, activityLevel, targetWeight, currentWeight, targetDays);
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
      
      <ActivityLevelSelector
        selectedActivityKey={selectedActivityKey}
        onActivityChange={handleActivityChange}
      />

      <CalorieResults
        dailyCalories={dailyCalories}
        minProtein={minProtein}
        maxProtein={maxProtein}
        targetWeight={targetWeight}
        targetDays={targetDays}
        weeklyChange={weeklyChange}
        warningMessage={weightChangeWarning.message}
        warningColor={weightChangeWarning.color}
      />
    </Card>
  );
};

export default CalorieCalculator;