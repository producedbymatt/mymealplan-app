import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ActivityLevelType } from "@/types/calculator";
import { toast } from "sonner";

interface ActivityLevelLoaderProps {
  onActivityLevelLoaded: (level: ActivityLevelType) => void;
}

const ActivityLevelLoader = ({ onActivityLevelLoaded }: ActivityLevelLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

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
          onActivityLevelLoaded(data.activity_level);
        }
      } catch (error) {
        console.error('Error loading activity level:', error);
        toast.error("Failed to load activity level");
      } finally {
        setIsLoading(false);
      }
    };

    loadActivityLevel();
  }, [onActivityLevelLoaded]);

  return null;
};

export default ActivityLevelLoader;