import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface ActivityLevelSliderProps {
  height: number;
  currentWeight: number;
  targetWeight: number;
  targetDays: number;
  onActivityLevelChange: (level: number) => void;
}

export const ActivityLevelSlider = ({
  height,
  currentWeight,
  targetWeight,
  targetDays,
  onActivityLevelChange,
}: ActivityLevelSliderProps) => {
  const [activityLevel, setActivityLevel] = useState([1.2]); // Default to sedentary

  useEffect(() => {
    const loadActivityLevel = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('user_metrics')
          .select('activity_level')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error loading activity level:', error);
          return;
        }

        if (data?.activity_level) {
          console.log('Loaded activity level:', data.activity_level);
          setActivityLevel([data.activity_level]);
          onActivityLevelChange(data.activity_level);
        }
      } catch (err) {
        console.error('Failed to load activity level:', err);
      }
    };

    loadActivityLevel();
  }, [onActivityLevelChange]);

  const handleActivityLevelChange = async (newLevel: number[]) => {
    setActivityLevel(newLevel);
    onActivityLevelChange(newLevel[0]);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_metrics')
        .upsert({
          user_id: user.id,
          activity_level: newLevel[0],
          height,
          current_weight: currentWeight,
          target_weight: targetWeight,
          target_days: targetDays,
        });

      if (error) {
        console.error('Error saving activity level:', error);
        toast.error('Failed to save activity level');
        return;
      }

      console.log('Saved activity level:', newLevel[0]);
    } catch (err) {
      console.error('Failed to save activity level:', err);
      toast.error('Failed to save activity level');
    }
  };

  const getActivityLevelLabel = (level: number) => {
    if (level <= 1.2) return "Sedentary (little or no exercise)";
    if (level <= 1.375) return "Lightly active (exercise 1-3 times/week)";
    if (level <= 1.55) return "Moderately active (exercise 3-5 times/week)";
    if (level <= 1.725) return "Very active (exercise 6-7 times/week)";
    return "Extra active (very intense exercise daily)";
  };

  return (
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
  );
};