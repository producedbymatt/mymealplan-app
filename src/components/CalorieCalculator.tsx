import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { ACTIVITY_LEVELS, ActivityLevelKey } from "./calories/constants";
import { 
  calculateBMR,
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
  const [selectedActivityKey, setSelectedActivityKey] = useState<ActivityLevelKey | "">("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [recommendedCalories, setRecommendedCalories] = useState<number | null>(null);

  useEffect(() => {
    const fetchRecommendedCalories = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        console.log('Fetching recommended calories for user:', user.id);
        const { data, error } = await supabase
          .from('user_metrics')
          .select('recommended_calories')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error fetching recommended calories:', error);
          return;
        }

        if (data?.recommended_calories) {
          console.log('Fetched recommended calories:', data.recommended_calories);
          setRecommendedCalories(data.recommended_calories);
          onCaloriesCalculated?.(data.recommended_calories);
        }
      } catch (err) {
        console.error('Exception while fetching recommended calories:', err);
      }
    };

    fetchRecommendedCalories();
  }, [onCaloriesCalculated]);

  const saveActivityLevel = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to save your activity level");
        return;
      }

      if (!selectedActivityKey) {
        toast.error("Please select an activity level first");
        return;
      }

      console.log('Saving activity level:', selectedActivityKey);
      const { data: existingMetrics } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!recommendedCalories) {
        toast.error("Unable to save without recommended calories");
        return;
      }

      const metricsToUpdate = {
        user_id: user.id,
        activity_level: selectedActivityKey,
        height: existingMetrics?.height || height,
        current_weight: existingMetrics?.current_weight || currentWeight,
        target_weight: existingMetrics?.target_weight || targetWeight,
        target_days: existingMetrics?.target_days || targetDays,
        recommended_calories: recommendedCalories,
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
      console.log('Successfully saved recommended calories:', recommendedCalories);
      toast.success("Activity level updated");
      setHasUnsavedChanges(false);
      onSaveMetrics?.();
    } catch (err) {
      console.error('Error in saveActivityLevel:', err);
      toast.error("An error occurred while saving");
    }
  };

  const handleActivityChange = (value: ActivityLevelKey) => {
    console.log('Activity level changed to:', value);
    setSelectedActivityKey(value);
    setActivityLevel(ACTIVITY_LEVELS[value].value);
    setHasUnsavedChanges(true);
  };

  const bmr = calculateBMR(currentWeight, height);
  const weightDifference = targetWeight - currentWeight;
  const isGainingWeight = weightDifference > 0;
  const weeklyChange = Math.abs((weightDifference / targetDays) * 7);
  const { minProtein, maxProtein } = calculateProteinNeeds(targetWeight, activityLevel);
  const weightChangeWarning = getWeightChangeWarning(weeklyChange, isGainingWeight);

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
              className="bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950"
            >
              Save Activity Level
            </Button>
          </div>
        )}

        <CalorieResults
          dailyCalories={recommendedCalories || 0}
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