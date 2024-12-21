import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const [activityLevel, setActivityLevel] = useState<number>(ACTIVITY_LEVELS.sedentary.value);
  const [selectedActivityKey, setSelectedActivityKey] = useState<ActivityLevelKey>("sedentary");
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const initializeActivityLevel = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log('No user found, using default activity level');
          setIsLoading(false);
          return;
        }

        console.log('Loading activity level for user:', user.id);
        const { data, error } = await supabase
          .from('user_metrics')
          .select('activity_level')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error loading activity level:', error);
          setIsLoading(false);
          return;
        }

        if (data && data.length > 0 && data[0].activity_level) {
          const storedLevel = data[0].activity_level as ActivityLevelKey;
          console.log('Retrieved activity level from database:', storedLevel);
          setSelectedActivityKey(storedLevel);
          setActivityLevel(ACTIVITY_LEVELS[storedLevel].value);
        } else {
          console.log('No saved activity level found, using default');
          setSelectedActivityKey("sedentary");
          setActivityLevel(ACTIVITY_LEVELS.sedentary.value);
        }
      } catch (err) {
        console.error('Error in initializeActivityLevel:', err);
      } finally {
        setIsLoading(false);
        console.log('Activity level initialization complete');
      }
    };

    initializeActivityLevel();
  }, []);

  const saveActivityLevel = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to save your activity level");
        return;
      }

      console.log('Saving activity level:', selectedActivityKey);
      const { data: existingMetrics } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      const metricsToUpdate = {
        user_id: user.id,
        activity_level: selectedActivityKey,
        height: existingMetrics?.height || height,
        current_weight: existingMetrics?.current_weight || currentWeight,
        target_weight: existingMetrics?.target_weight || targetWeight,
        target_days: existingMetrics?.target_days || targetDays,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('user_metrics')
        .upsert(metricsToUpdate);

      if (error) {
        console.error('Error saving activity level:', error);
        toast.error("Failed to save activity level");
        return;
      }

      console.log('Successfully saved activity level:', selectedActivityKey);
      toast.success("Activity level updated");
      setHasUnsavedChanges(false);
      onSaveMetrics?.();
    } catch (err) {
      console.error('Error in saveActivityLevel:', err);
      toast.error("An error occurred while saving");
    }
  };

  const handleActivityChange = (value: ActivityLevelKey) => {
    if (isLoading) {
      console.log('Skipping activity change - still loading');
      return;
    }

    console.log('Activity level changed to:', value);
    setSelectedActivityKey(value);
    setActivityLevel(ACTIVITY_LEVELS[value].value);
    setHasUnsavedChanges(true);
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
              onClick={saveActivityLevel}
              className="bg-primary hover:bg-primary/90"
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
        />
      </div>
    </Card>
  );
};

export default CalorieCalculator;