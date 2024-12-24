import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PreviewMessage from "@/components/PreviewMessage";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import BMICalculator from "@/components/BMICalculator";
import WeightGoal from "@/components/WeightGoal";
import MealPlan from "@/components/MealPlan";

const Index = () => {
  const [userMetrics, setUserMetrics] = useState({
    height: 0,
    currentWeight: 0,
    targetWeight: 0,
    targetDays: 0,
    gender: undefined as "male" | "female" | undefined,
  });
  
  const [session, setSession] = useState<any>(null);
  const [hasMetrics, setHasMetrics] = useState(false);
  const [bmi, setBmi] = useState<number>(0);

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
        toast.error("Failed to load your metrics");
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
        setHasMetrics(true);
      } else {
        console.log('No metrics found for user');
        setHasMetrics(false);
      }
    } catch (err) {
      console.error('Exception while loading metrics:', err);
      toast.error("An error occurred while loading your metrics");
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
    <SessionContextProvider supabaseClient={supabase}>
      <div className="min-h-screen w-full bg-background">
        {!session && <PreviewMessage />}
        <DashboardLayout
          hasMetrics={hasMetrics}
          userMetrics={userMetrics}
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
          }}
          onSaveMetrics={saveUserMetrics}
        />

        <div className="container mx-auto px-4 space-y-8 mb-8">
          <BMICalculator
            onBMICalculated={(calculatedBMI) => setBmi(calculatedBMI)}
            onMetricsUpdate={(height, weight) => {
              setUserMetrics(prev => ({
                ...prev,
                height,
                currentWeight: weight
              }));
            }}
          />

          <WeightGoal
            onGoalSet={(weight, days) => {
              setUserMetrics(prev => ({
                ...prev,
                targetWeight: weight,
                targetDays: days
              }));
            }}
          />

          <MealPlan
            dailyCalories={userMetrics?.recommended_calories}
          />
        </div>
      </div>
    </SessionContextProvider>
  );
};

export default Index;