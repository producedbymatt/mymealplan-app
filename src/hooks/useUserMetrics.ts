import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface UserMetrics {
  height: number;
  currentWeight: number;
  targetWeight: number;
  targetDays: number;
}

export const useUserMetrics = (session: any) => {
  const [userMetrics, setUserMetrics] = useState<UserMetrics>({
    height: 0,
    currentWeight: 0,
    targetWeight: 0,
    targetDays: 0,
  });
  const [recommendedCalories, setRecommendedCalories] = useState(1200);
  const [hasMetrics, setHasMetrics] = useState(false);

  const fetchUserMetrics = async (userId: string) => {
    console.log('Fetching user metrics for user:', userId);
    try {
      const { data, error } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching user metrics:', error);
        toast.error("Error loading your metrics");
        return;
      }

      if (!data || data.length === 0) {
        console.log('No metrics found');
        setHasMetrics(false);
        return;
      }

      const metrics = data[0];
      console.log('Fetched user metrics:', metrics);
      
      setUserMetrics({
        height: metrics.height || 0,
        currentWeight: metrics.current_weight || 0,
        targetWeight: metrics.target_weight || 0,
        targetDays: metrics.target_days || 0,
      });
      setRecommendedCalories(metrics.recommended_calories || 1200);
      setHasMetrics(true);
    } catch (error) {
      console.error('Exception in fetchUserMetrics:', error);
      toast.error("An unexpected error occurred");
    }
  };

  const saveUserMetrics = async () => {
    if (!session?.user) {
      toast.error("Please log in to save your metrics");
      return;
    }

    console.log('Attempting to save user metrics:', {
      user_id: session.user.id,
      height: userMetrics.height,
      current_weight: userMetrics.currentWeight,
      target_weight: userMetrics.targetWeight,
      target_days: userMetrics.targetDays,
      recommended_calories: recommendedCalories,
    });

    try {
      const { error } = await supabase
        .from('user_metrics')
        .upsert({
          user_id: session.user.id,
          height: userMetrics.height || 0,
          current_weight: userMetrics.currentWeight || 0,
          target_weight: userMetrics.targetWeight || 0,
          target_days: userMetrics.targetDays || 0,
          recommended_calories: recommendedCalories || 1200,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error saving user metrics:', error);
        toast.error("Failed to save your metrics");
        return;
      }

      console.log('Successfully saved user metrics');
      toast.success("Your metrics have been saved");
      setHasMetrics(true);
    } catch (err) {
      console.error('Exception while saving metrics:', err);
      toast.error("An unexpected error occurred while saving your metrics");
    }
  };

  return {
    userMetrics,
    setUserMetrics,
    recommendedCalories,
    setRecommendedCalories,
    hasMetrics,
    fetchUserMetrics,
    saveUserMetrics,
  };
};