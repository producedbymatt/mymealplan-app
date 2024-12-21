import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface CalorieCalculatorProps {
  height: number;
  currentWeight: number;
  targetWeight: number;
  targetDays: number;
  onCaloriesCalculated?: (calories: number) => void;
}

// Using enum values that exactly match the database enum type
const ACTIVITY_LEVELS = {
  "sedentary": {
    label: "Sedentary (little or no exercise)",
    value: 1.2
  },
  "lightly_active": {
    label: "Lightly active (exercise 1-3 times/week)",
    value: 1.375
  },
  "moderately_active": {
    label: "Moderately active (exercise 3-5 times/week)",
    value: 1.55
  },
  "very_active": {
    label: "Very active (exercise 6-7 times/week)",
    value: 1.725
  },
  "extra_active": {
    label: "Extra active (very intense exercise daily)",
    value: 1.9
  }
} as const;

const CalorieCalculator = ({ 
  height, 
  currentWeight, 
  targetWeight, 
  targetDays,
  onCaloriesCalculated 
}: CalorieCalculatorProps) => {
  const [activityLevel, setActivityLevel] = useState<number>(1.2); // Default to sedentary
  const [selectedActivityKey, setSelectedActivityKey] = useState<keyof typeof ACTIVITY_LEVELS>("sedentary");

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
        const storedLevel = data[0].activity_level as keyof typeof ACTIVITY_LEVELS;
        console.log('Retrieved activity level from database:', storedLevel);
        setSelectedActivityKey(storedLevel);
        setActivityLevel(ACTIVITY_LEVELS[storedLevel].value);
      }
    } catch (err) {
      console.error('Error in loadActivityLevel:', err);
    }
  };

  const saveActivityLevel = async (level: keyof typeof ACTIVITY_LEVELS) => {
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

  const calculateBMR = () => {
    const weightInKg = currentWeight * 0.453592;
    const heightInCm = height * 2.54;
    const bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * 30 + 5;
    console.log("Calculated BMR:", bmr);
    return bmr;
  };

  const calculateDailyCalories = () => {
    const bmr = calculateBMR();
    const tdee = bmr * activityLevel;
    
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
    const baseProteinMultiplier = activityLevel >= 1.55 ? 1.0 : 0.8;
    const maxProteinMultiplier = activityLevel >= 1.55 ? 1.4 : 1.2;
    
    const minProtein = Math.round(targetWeight * baseProteinMultiplier);
    const maxProtein = Math.round(targetWeight * maxProteinMultiplier);
    
    return { minProtein, maxProtein };
  };

  const handleActivityChange = async (value: string) => {
    const level = value as keyof typeof ACTIVITY_LEVELS;
    console.log("Activity level changed to:", level);
    
    setSelectedActivityKey(level);
    setActivityLevel(ACTIVITY_LEVELS[level].value);
    await saveActivityLevel(level);
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

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Calorie Analysis</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Activity Level</label>
        <Select
          value={selectedActivityKey}
          onValueChange={handleActivityChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your activity level" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(ACTIVITY_LEVELS).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
