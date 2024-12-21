import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ActivityLevelType } from "@/types/calculator";
import { toast } from "sonner";
import ActivityLevelSelect from "./ActivityLevelSelect";
import ActivityLevelLoader from "./ActivityLevelLoader";

interface ActivityLevelManagerProps {
  onActivityLevelChange: (level: ActivityLevelType) => void;
}

const ActivityLevelManager = ({ onActivityLevelChange }: ActivityLevelManagerProps) => {
  const [activityLevel, setActivityLevel] = useState<ActivityLevelType>('sedentary');
  const [isSaving, setIsSaving] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleActivityLevelLoaded = useCallback((level: ActivityLevelType) => {
    console.log('Activity level loaded:', level);
    setActivityLevel(level);
    setIsInitialized(true);
    onActivityLevelChange(level);
  }, [onActivityLevelChange]);

  const saveActivityLevel = async (newLevel: ActivityLevelType) => {
    if (isSaving || !isInitialized) return;
    
    try {
      setIsSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please log in to save your activity level");
        return;
      }

      console.log('Saving new activity level:', newLevel);
      const { error } = await supabase
        .from('user_metrics')
        .update({ 
          activity_level: newLevel,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error saving activity level:', error);
        toast.error("Failed to save activity level");
        // Revert to previous state on error
        setActivityLevel(activityLevel);
        return;
      }

      console.log('Successfully saved activity level:', newLevel);
    } catch (error) {
      console.error('Exception while saving activity level:', error);
      toast.error("Failed to save activity level");
      // Revert to previous state on error
      setActivityLevel(activityLevel);
    } finally {
      setIsSaving(false);
    }
  };

  const handleActivityLevelChange = async (newLevel: ActivityLevelType) => {
    if (!isInitialized) return;
    
    console.log('Activity level changing to:', newLevel);
    setActivityLevel(newLevel);
    onActivityLevelChange(newLevel);
    await saveActivityLevel(newLevel);
  };

  // Prevent any state updates until initial load is complete
  useEffect(() => {
    return () => {
      setIsInitialized(false);
    };
  }, []);

  if (!isInitialized) {
    return (
      <ActivityLevelLoader onActivityLevelLoaded={handleActivityLevelLoaded} />
    );
  }

  return (
    <>
      <ActivityLevelLoader onActivityLevelLoaded={handleActivityLevelLoaded} />
      <ActivityLevelSelect 
        value={activityLevel}
        onChange={handleActivityLevelChange}
      />
    </>
  );
};

export default ActivityLevelManager;