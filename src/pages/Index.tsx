import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import BMICalculator from "@/components/BMICalculator";
import WeightTracker from "@/components/WeightTracker";
import MealPlan from "@/components/MealPlan";
import CalorieCalculator from "@/components/CalorieCalculator";
import AuthForm from "@/components/auth/AuthForm";
import { toast } from "sonner";

const Index = () => {
  const [userMetrics, setUserMetrics] = useState({
    height: 0,
    currentWeight: 0,
    targetWeight: 0,
    targetDays: 0,
  });
  const [recommendedCalories, setRecommendedCalories] = useState(1200);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Initialize session
    const initSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log('Initial session check:', currentSession);
        setSession(currentSession);
        
        if (currentSession?.user) {
          console.log('Found existing session, fetching metrics for user:', currentSession.user.id);
          await fetchUserMetrics(currentSession.user.id);
        }
      } catch (error) {
        console.error('Error initializing session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', _event, 'Session:', session?.user?.id);
      setSession(session);
      
      if (session?.user) {
        await fetchUserMetrics(session.user.id);
      }
    });

    // Cleanup subscription on component unmount
    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserMetrics = async (userId: string) => {
    console.log('Fetching user metrics for user:', userId);
    const { data, error } = await supabase
      .from('user_metrics')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user metrics:', error);
      return;
    }

    if (data) {
      console.log('Fetched user metrics:', data);
      setUserMetrics({
        height: data.height || 0,
        currentWeight: data.current_weight || 0,
        targetWeight: data.target_weight || 0,
        targetDays: data.target_days || 0,
      });
      setRecommendedCalories(data.recommended_calories || 1200);
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
    } catch (err) {
      console.error('Exception while saving metrics:', err);
      toast.error("An unexpected error occurred while saving your metrics");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col">
      <div className="container mx-auto px-4 flex-grow">
        <img 
          src="/lovable-uploads/67003c76-1908-4b2f-93d3-01ea4a4cf510.png" 
          alt="MyMealPlan Logo" 
          className="mx-auto mb-6 h-24 w-auto"
        />
        <h1 className="text-4xl font-bold text-center mb-4">
          MyMealPlan.App
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          Track your weight loss journey, calculate your recommended daily calorie and protein intake, and get a custom meal plan designed to meet your goals.
        </p>

        {!session && (
          <div className="mb-12 bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Sign Up for Free</h2>
              <p className="text-gray-600 mt-2">
                Create an account to unlock all features including weight tracking, BMI calculation, and personalized meal plans.
              </p>
            </div>
            <AuthForm />
          </div>
        )}

        {session && (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div>
                <BMICalculator 
                  onBMICalculated={handleBMICalculated}
                  onMetricsUpdate={(height, weight) => {
                    setUserMetrics(prev => ({
                      ...prev,
                      height,
                      currentWeight: weight
                    }));
                    saveUserMetrics();
                  }}
                />
              </div>
              <div className="md:col-span-2">
                <WeightTracker
                  onGoalSet={(weight, days) => {
                    setUserMetrics(prev => ({
                      ...prev,
                      targetWeight: weight,
                      targetDays: days
                    }));
                    saveUserMetrics();
                  }}
                />
              </div>
            </div>
            {userMetrics.height > 0 && userMetrics.targetWeight > 0 && (
              <div className="mt-8">
                <CalorieCalculator 
                  {...userMetrics} 
                  onCaloriesCalculated={(calories: number) => {
                    console.log("Setting recommended calories:", calories);
                    setRecommendedCalories(calories);
                    saveUserMetrics();
                  }}
                />
              </div>
            )}
            <div className="mt-8">
              <MealPlan dailyCalories={recommendedCalories} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;