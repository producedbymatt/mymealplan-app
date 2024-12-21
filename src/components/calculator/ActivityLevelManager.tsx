import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ActivityLevelType } from "@/types/calculator";
import { toast } from "sonner";
import ActivityLevelSelect from "./ActivityLevelSelect";
import { Button } from "@/components/ui/button";

interface ActivityLevelManagerProps {
  onActivityLevelChange: (level: ActivityLevelType) => void;
}

const ActivityLevelManager = ({ onActivityLevelChange }: ActivityLevelManagerProps) => {
  const [activityLevel, setActivityLevel] = useState<ActivityLevelType>('sedentary');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleActivityLevelChange = (newLevel: ActivityLevelType) => {
    setActivityLevel(newLevel);
    onActivityLevelChange(newLevel);
    setUnsavedChanges(true);
  };

  const handleSaveToProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please log in to save your activity level");
      return;
    }

    const { error } = await supabase
      .from('user_metrics')
      .update({ 
        activity_level: activityLevel,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error saving activity level:', error);
      toast.error("Failed to save activity level");
      return;
    }

    setUnsavedChanges(false);
    toast.success("Activity level saved to profile");
  };

  return (
    <div className="space-y-4">
      <ActivityLevelSelect 
        value={activityLevel}
        onChange={handleActivityLevelChange}
      />
      {unsavedChanges && (
        <Button 
          onClick={handleSaveToProfile}
          className="w-full"
        >
          Save to Profile
        </Button>
      )}
    </div>
  );
};

export default ActivityLevelManager;