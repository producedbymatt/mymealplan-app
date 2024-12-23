import BMICalculator from "@/components/BMICalculator";
import WeightGoal from "@/components/WeightGoal";
import CalorieCalculator from "@/components/CalorieCalculator";
import MealPlan from "@/components/MealPlan";
import StatsCards from "./StatsCards";
import MotivationalMessage from "./MotivationalMessage";
import { useState, useEffect } from "react";
import { useWeightLogs } from "@/hooks/useWeightLogs";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

interface WeightEntry {
  date: string;
  weight: number;
}

interface DashboardContentProps {
  userMetrics: {
    height: number;
    currentWeight: number;
    targetWeight: number;
    targetDays: number;
    created_at?: string;
    gender?: "male" | "female";
  };
  recommendedCalories: number;
  hasMetrics: boolean;
  onMetricsUpdate: (height: number, weight: number) => void;
  onGoalSet: (weight: number, days: number) => void;
  onCaloriesCalculated: (calories: number) => void;
  onSaveMetrics: () => void;
}

const DashboardContent = ({
  userMetrics,
  recommendedCalories,
  hasMetrics,
  onMetricsUpdate,
  onGoalSet,
  onCaloriesCalculated,
  onSaveMetrics,
}: DashboardContentProps) => {
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [displayedCalories, setDisplayedCalories] = useState(recommendedCalories);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { loadWeightLogs } = useWeightLogs(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      if (session) {
        await loadEntries();
      }
      setIsLoading(false);
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    console.log('Updating displayed calories to:', recommendedCalories);
    setDisplayedCalories(recommendedCalories);
  }, [recommendedCalories]);

  const loadEntries = async () => {
    console.log("Loading weight entries...");
    const entries = await loadWeightLogs();
    if (entries) {
      console.log("Weight entries loaded:", entries);
      setWeightEntries(entries);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <StatsCards 
        metrics={userMetrics}
        recommendedCalories={displayedCalories}
        hasMetrics={hasMetrics}
        weightEntries={weightEntries}
        isAuthenticated={isAuthenticated}
      />
      
      <div className="mt-8">
        <MotivationalMessage
          currentWeight={userMetrics.currentWeight}
          targetWeight={userMetrics.targetWeight}
          targetDays={userMetrics.targetDays}
        />
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <BMICalculator
            onBMICalculated={() => {}}
            onMetricsUpdate={onMetricsUpdate}
          />
        </div>
        <div>
          <WeightGoal onGoalSet={onGoalSet} />
        </div>
      </div>

      {userMetrics.height > 0 && userMetrics.targetWeight > 0 && (
        <div className="mt-8">
          <CalorieCalculator
            {...userMetrics}
            onCaloriesCalculated={onCaloriesCalculated}
            onSaveMetrics={onSaveMetrics}
          />
        </div>
      )}

      <div className="mt-8">
        <MealPlan dailyCalories={displayedCalories} />
      </div>
    </div>
  );
};

export default DashboardContent;