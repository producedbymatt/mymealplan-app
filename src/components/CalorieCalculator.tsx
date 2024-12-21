import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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
  const [activityLevel, setActivityLevel] = useState([1.2]); // Default to sedentary
  const [isLoading, setIsLoading] = useState(true);
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  // Load activity level from database
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
          setActivityLevel([data.activity_level]);
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

  // Save activity level to database with debounce and retry
  const saveActivityLevel = async (newLevel: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to save your activity level");
        return;
      }

      // Clear any pending save timeout
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      // Set a new timeout to save after 500ms of no changes
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
              if (error.code === '40P01') { // Deadlock error code
                retryCount++;
                if (retryCount < maxRetries) {
                  // Wait for a random time between 100-500ms before retrying
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
    const tdee = bmr * activityLevel[0];
    
    // Calculate required surplus/deficit based on weight goal
    const weightDifference = targetWeight - currentWeight;
    const isGainingWeight = weightDifference > 0;
    const totalCaloriesNeeded = Math.abs(weightDifference) * 3500;
    const dailyCalorieAdjustment = totalCaloriesNeeded / targetDays;
    
    // Calculate target calories with surplus or deficit
    const targetCalories = tdee + (isGainingWeight ? dailyCalorieAdjustment : -dailyCalorieAdjustment);
    
    console.log("TDEE:", tdee);
    console.log("Activity Level:", activityLevel[0]);
    console.log("Daily calorie adjustment:", dailyCalorieAdjustment);
    console.log("Target daily calories:", targetCalories);
    
    return Math.max(1200, Math.round(targetCalories));
  };

  const calculateProteinNeeds = () => {
    const baseProteinMultiplier = activityLevel[0] >= 1.55 ? 1.0 : 0.8;
    const maxProteinMultiplier = activityLevel[0] >= 1.55 ? 1.4 : 1.2;
    
    const minProtein = Math.round(targetWeight * baseProteinMultiplier);
    const maxProtein = Math.round(targetWeight * maxProteinMultiplier);
    
    return { minProtein, maxProtein };
  };

  const handleActivityLevelChange = (newValue: number[]) => {
    setActivityLevel(newValue);
    saveActivityLevel(newValue[0]);
  };

  const getActivityLevelLabel = (level: number) => {
    if (level <= 1.2) return "Sedentary (little or no exercise)";
    if (level <= 1.375) return "Lightly active (exercise 1-3 times/week)";
    if (level <= 1.55) return "Moderately active (exercise 3-5 times/week)";
    if (level <= 1.725) return "Very active (exercise 6-7 times/week)";
    return "Extra active (very intense exercise daily)";
  };

  const dailyCalories = calculateDailyCalories();
  const weightDifference = targetWeight - currentWeight;
  const isGainingWeight = weightDifference > 0;
  const weeklyChange = Math.abs((weightDifference / targetDays) * 7);
  const { minProtein, maxProtein } = calculateProteinNeeds();

  const getWeightChangeWarning = (weeklyChange: number) => {
    if (weeklyChange > 2) {
      return {
        message: `Your target may be too aggressive. A safe weight ${isGainingWeight ? 'gain' : 'loss'} rate is 1-2 pounds per week.`,
        color: "text-red-500"
      };
    }
    if (weeklyChange === 0) {
      return {
        message: "Your current weight matches your target weight.",
        color: "text-green-500"
      };
    }
    return {
      message: `Your target is within a healthy weight ${isGainingWeight ? 'gain' : 'loss'} range of 1-2 pounds per week.`,
      color: "text-green-500"
    };
  };

  const weightChangeWarning = getWeightChangeWarning(weeklyChange);

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
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Activity Level</label>
        <Slider
          value={activityLevel}
          onValueChange={handleActivityLevelChange}
          min={1.2}
          max={1.9}
          step={0.025}
          className="mb-2 [&_.relative]:before:absolute [&_.relative]:before:inset-0 [&_.relative]:before:h-2 [&_.relative]:before:rounded-full [&_.relative]:before:bg-gradient-to-r [&_.relative]:before:from-blue-400 [&_.relative]:before:via-green-400 [&_.relative]:before:via-yellow-400 [&_.relative]:before:to-red-400 [&_[role=slider]]:z-20 [&_.relative]:bg-transparent [&_[class*=SliderRange]]:bg-transparent"
        />
        <p className="text-sm text-muted-foreground">
          {getActivityLevelLabel(activityLevel[0])}
        </p>
      </div>

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