import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ActivityLevelType } from "@/types/calculator";
import { toast } from "sonner";
import ActivityLevelSelect from "./ActivityLevelSelect";

interface ActivityLevelManagerProps {
  onActivityLevelChange: (level: ActivityLevelType) => void;
}

const ActivityLevelManager = ({ onActivityLevelChange }: ActivityLevelManagerProps) => {
  const [activityLevel, setActivityLevel] = useState<ActivityLevelType>('sedentary');

  const handleActivityLevelChange = async (newLevel: ActivityLevelType) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please log in to save your activity level");
      return;
    }

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
    toast.success("Activity level updated successfully");
  };

  return (
    <ActivityLevelSelect 
      value={activityLevel}
      onChange={handleActivityLevelChange}
    />
  );
};

export default ActivityLevelManager;