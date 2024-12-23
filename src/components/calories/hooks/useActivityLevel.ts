import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ActivityLevelKey, ACTIVITY_LEVELS } from "../constants";
import { toast } from "sonner";

export const useActivityLevel = (
  height: number,
  currentWeight: number,
  targetWeight: number,
  targetDays: number,
  onCaloriesCalculated?: (calories: number) => void,
  onSaveMetrics?: () => void,
) => {
  const [activityLevel, setActivityLevel] = useState<number>(ACTIVITY_LEVELS.sedentary.value);
  const [selectedActivityKey, setSelectedActivityKey] = useState<ActivityLevelKey>("sedentary");
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [savedCalories, setSavedCalories] = useState<number | null>(null);

  const loadActivityLevel = async (userId: string) => {
    try {
      console.log('Loading activity level for user:', userId);
      const { data, error } = await supabase
        .from('user_metrics')
        .select('activity_level, recommended_calories')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading activity level:', error);
        return;
      }

      console.log('Retrieved data from database:', data);

      if (data?.activity_level && ACTIVITY_LEVELS[data.activity_level as ActivityLevelKey]) {
        const storedLevel = data.activity_level as ActivityLevelKey;
        console.log('Setting activity level to:', storedLevel);
        setSelectedActivityKey(storedLevel);
        setActivityLevel(ACTIVITY_LEVELS[storedLevel].value);
        setSavedCalories(data.recommended_calories);
      } else {
        console.log('No valid activity level found, using default');
        setSelectedActivityKey("sedentary");
        setActivityLevel(ACTIVITY_LEVELS.sedentary.value);
      }
    } catch (err) {
      console.error('Error in loadActivityLevel:', err);
    }
  };

  const saveActivityLevel = async (calculatedCalories: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to save your activity level");
        return;
      }

      console.log('Saving activity level:', selectedActivityKey);
      console.log('Saving calculated calories:', calculatedCalories);

      const metricsToUpdate = {
        user_id: user.id,
        activity_level: selectedActivityKey,
        height,
        current_weight: currentWeight,
        target_weight: targetWeight,
        target_days: targetDays,
        recommended_calories: calculatedCalories,
        updated_at: new Date().toISOString()
      };

      const { error: upsertError } = await supabase
        .from('user_metrics')
        .upsert(metricsToUpdate);

      if (upsertError) {
        console.error('Error saving metrics:', upsertError);
        toast.error("Failed to save activity level");
        return;
      }

      console.log('Successfully saved activity level:', selectedActivityKey);
      setSavedCalories(calculatedCalories);
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
    setSavedCalories(null);
  };

  useEffect(() => {
    const initializeActivityLevel = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log('No user found, using default activity level');
          setIsLoading(false);
          return;
        }

        await loadActivityLevel(user.id);
      } catch (err) {
        console.error('Error in initializeActivityLevel:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeActivityLevel();
  }, []);

  return {
    activityLevel,
    selectedActivityKey,
    isLoading,
    hasUnsavedChanges,
    savedCalories,
    handleActivityChange,
    saveActivityLevel
  };
};