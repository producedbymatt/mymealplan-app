import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import ActivityLevelSelect from "./calculator/ActivityLevelSelect";
import CalorieResults from "./calculator/CalorieResults";
import { ActivityLevelType, getActivityMultiplier } from "@/types/calculator";

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
  const [activityLevel, setActivityLevel] = useState<ActivityLevelType>('sedentary');
  const [isLoading, setIsLoading] = useState(true);
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadActivityLevel = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('user_metrics')
          .select('activity_level')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;

        if (data?.activity_level) {
          console.log('Loaded activity level:', data.activity_level);
          setActivityLevel(data.activity_level);
        }
      } catch (error) {
        console.error('Error loading activity level:', error);
        toast.error("Failed to load activity level");
      } finally {
        setIsLoading(false);
      }
    };

    loadActivityLevel();
  }, []);

  const saveActivityLevel = async (newLevel: ActivityLevelType) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to save your activity level");
        return;
      }

      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      const timeout = setTimeout(async () => {
        const maxRetries = 3;
        let retryCount = 0;
        let success = false;

        while (!success && retryCount < maxRetries) {
          try {
            const { error } = await supabase
              .from('user_metrics')
              .update({ activity_level: newLevel })
              .eq('user_id', user.id);

            if (error) {
              if (error.code === '40P01') {
                retryCount++;
                if (retryCount < maxRetries) {
                  await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 100));
                  continue;
                }
              }
              throw error;
            }

            success = true;
            console.log('Saved activity level:', newLevel);
          } catch (error) {
            console.error(`Error saving activity level (attempt ${retryCount + 1}):`, error);
            if (retryCount === maxRetries - 1) {
              toast.error("Failed to save activity level");
            }
          }
        }
      }, 500);

      setSaveTimeout(timeout);
    } catch (error) {
      console.error('Error in saveActivityLevel:', error);
      toast.error("Failed to save activity level");
    }
  };

  const calculateBMR = () => {
    const weightInKg = currentWeight * 0.453592;
    const heightInCm = height * 2.54;
    const bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * 30 + 5;
    console.log("Calculated BMR:", bmr);
    return bmr;
  };

  const calculateDailyCalories = () => {
    const bmr = calculateBMR();
    const multiplier = getActivityMultiplier(activityLevel);
    const tdee = bmr * multiplier;
    
    const weightDifference = targetWeight - currentWeight;
    const isGainingWeight = weightDifference > 0;
    const totalCaloriesNeeded = Math.abs(weightDifference) * 3500;
    const dailyCalorieAdjustment = totalCaloriesNeeded / targetDays;
    
    const targetCalories = tdee + (isGainingWeight ? dailyCalorieAdjustment : -dailyCalorieAdjustment);
    
    console.log("TDEE:", tdee);
    console.log("Activity Level:", activityLevel);
    console.log("Daily calorie adjustment:", dailyCalorieAdjustment);
    console.log("Target daily calories:", targetCalories);
    
    return Math.max(1200, Math.round(targetCalories));
  };

  const calculateProteinNeeds = () => {
    const multiplier = getActivityMultiplier(activityLevel);
    const baseProteinMultiplier = multiplier >= 1.55 ? 1.0 : 0.8;
    const maxProteinMultiplier = multiplier >= 1.55 ? 1.4 : 1.2;
    
    const minProtein = Math.round(targetWeight * baseProteinMultiplier);
    const maxProtein = Math.round(targetWeight * maxProteinMultiplier);
    
    return { minProtein, maxProtein };
  };

  const handleActivityLevelChange = (newValue: ActivityLevelType) => {
    setActivityLevel(newValue);
    saveActivityLevel(newValue);
  };

  const dailyCalories = calculateDailyCalories();
  const weightDifference = targetWeight - currentWeight;
  const isGainingWeight = weightDifference > 0;
  const weeklyChange = Math.abs((weightDifference / targetDays) * 7);
  const { minProtein, maxProtein } = calculateProteinNeeds();

  useEffect(() => {
    onCaloriesCalculated?.(dailyCalories);
  }, [dailyCalories, onCaloriesCalculated]);

  if (isLoading) {
    return (
      <Card className="p-6 w-full max-w-2xl mx-auto mt-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
          <div className="h-2 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Calorie Analysis</h2>
      
      <ActivityLevelSelect 
        value={activityLevel}
        onChange={handleActivityLevelChange}
      />

      <CalorieResults
        dailyCalories={dailyCalories}
        minProtein={minProtein}
        maxProtein={maxProtein}
        targetWeight={targetWeight}
        targetDays={targetDays}
        weeklyChange={weeklyChange}
        isGainingWeight={isGainingWeight}
      />
    </Card>
  );
};

export default CalorieCalculator;