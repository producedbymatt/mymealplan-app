import { useState, useCallback } from "react";
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

  const handleActivityLevelLoaded = useCallback((level: ActivityLevelType) => {
    console.log('Activity level loaded:', level);
    setActivityLevel(level);
    onActivityLevelChange(level);
  }, [onActivityLevelChange]);

  const handleActivityLevelChange = async (newLevel: ActivityLevelType) => {
    if (isSaving) return;
    
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
        return;
      }

      setActivityLevel(newLevel);
      onActivityLevelChange(newLevel);
      console.log('Successfully saved activity level:', newLevel);
      toast.success("Activity level updated successfully");
    } catch (error) {
      console.error('Exception while saving activity level:', error);
      toast.error("Failed to save activity level");
    } finally {
      setIsSaving(false);
    }
  };

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