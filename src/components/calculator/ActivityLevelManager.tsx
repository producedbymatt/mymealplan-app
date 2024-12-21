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
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleActivityLevelLoaded = useCallback((level: ActivityLevelType) => {
    setActivityLevel(level);
    onActivityLevelChange(level);
  }, [onActivityLevelChange]);

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
              if (error.code === '40P01') { // Deadlock error code
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

  const handleActivityLevelChange = (newLevel: ActivityLevelType) => {
    console.log('Activity level changed to:', newLevel);
    setActivityLevel(newLevel);
    onActivityLevelChange(newLevel);
    saveActivityLevel(newLevel);
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