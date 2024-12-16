import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import MetricsPrompt from "@/components/dashboard/MetricsPrompt";
import DashboardContent from "@/components/dashboard/DashboardContent";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import LandingPage from "@/components/landing/LandingPage";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useUserMetrics } from "@/hooks/useUserMetrics";
import AuthForm from "@/components/auth/AuthForm";

const Index = () => {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    userMetrics,
    setUserMetrics,
    recommendedCalories,
    setRecommendedCalories,
    hasMetrics,
    setHasMetrics,
    saveUserMetrics,
  } = useUserMetrics(session);

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    const initSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log('Initial session check:', currentSession);
        setSession(currentSession);
      } catch (error) {
        console.error('Error initializing session:', error);
        toast.error("Error loading your session");
      } finally {
        setIsLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, 'Session:', session?.user?.id);
      setSession(session);
    });

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return <LandingPage />;
  }

  return (
    <DashboardLayout>
      {!hasMetrics ? (
        <MetricsPrompt />
      ) : (
        <DashboardContent
          userMetrics={userMetrics}
          recommendedCalories={recommendedCalories}
          onMetricsUpdate={(height, weight) => {
            setUserMetrics(prev => ({
              ...prev,
              height,
              currentWeight: weight
            }));
            saveUserMetrics();
          }}
          onGoalSet={(weight, days) => {
            setUserMetrics(prev => ({
              ...prev,
              targetWeight: weight,
              targetDays: days
            }));
            saveUserMetrics();
          }}
          onCaloriesCalculated={(calories: number) => {
            console.log("Setting recommended calories:", calories);
            setRecommendedCalories(calories);
            saveUserMetrics();
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default Index;