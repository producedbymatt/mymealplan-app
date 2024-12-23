import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PreviewMessage from "@/components/PreviewMessage";

const Index = () => {
  const [userMetrics, setUserMetrics] = useState({
    height: 0,
    currentWeight: 0,
    targetWeight: 0,
    targetDays: 0,
    gender: undefined as "male" | "female" | undefined,
  });
  
  const [recommendedCalories, setRecommendedCalories] = useState(1200);
  const [session, setSession] = useState<any>(null);
  const [hasMetrics, setHasMetrics] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loadUserMetrics(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        loadUserMetrics(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserMetrics = async (userId: string) => {
    try {
      console.log('Loading user metrics for user:', userId);
      const { data, error } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error loading user metrics:', error);
        return;
      }

      if (data) {
        console.log('Loaded user metrics:', data);
        setUserMetrics({
          height: data.height || 0,
          currentWeight: data.current_weight || 0,
          targetWeight: data.target_weight || 0,
          targetDays: data.target_days || 0,
          gender: data.gender as "male" | "female" | undefined,
        });
        setRecommendedCalories(data.recommended_calories || 1200);
        setHasMetrics(true);
      } else {
        console.log('No metrics found for user');
        setHasMetrics(false);
      }
    } catch (err) {
      console.error('Exception while loading metrics:', err);
    }
  };

  const saveUserMetrics = async () => {
    if (!session?.user) {
      toast.error("Please log in to save your metrics");
      return;
    }

    console.log('Saving user metrics:', {
      user_id: session.user.id,
      ...userMetrics,
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
          gender: userMetrics.gender,
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

  return (
    <div className="min-h-screen w-full bg-background">
      {!session && <PreviewMessage />}
      <DashboardLayout
        hasMetrics={hasMetrics}
        userMetrics={userMetrics}
        recommendedCalories={recommendedCalories}
        onMetricsUpdate={(height, weight) => {
          setUserMetrics(prev => ({
            ...prev,
            height,
            currentWeight: weight
          }));
        }}
        onGoalSet={(weight, days) => {
          setUserMetrics(prev => ({
            ...prev,
            targetWeight: weight,
            targetDays: days
          }));
        }}
        onCaloriesCalculated={(calories: number) => {
          console.log("Setting recommended calories:", calories);
          setRecommendedCalories(calories);
        }}
        onSaveMetrics={saveUserMetrics}
      />
    </div>
  );
};

export default Index;