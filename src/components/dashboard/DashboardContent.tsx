import BMICalculator from "@/components/BMICalculator";
import WeightGoal from "@/components/WeightGoal";
import CalorieCalculator from "@/components/CalorieCalculator";
import MealPlan from "@/components/MealPlan";
import StatsCards from "./StatsCards";
import MotivationalMessage from "./MotivationalMessage";
import { useState, useEffect } from "react";
import { useWeightLogs } from "@/hooks/useWeightLogs";

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
}

const DashboardContent = ({
  userMetrics,
  recommendedCalories,
  hasMetrics,
  onMetricsUpdate,
  onGoalSet,
  onCaloriesCalculated,
}: DashboardContentProps) => {
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const { loadWeightLogs } = useWeightLogs(false);

  const loadEntries = async () => {
    console.log("Loading weight entries...");
    const entries = await loadWeightLogs();
    if (entries) {
      console.log("Weight entries loaded:", entries);
      setWeightEntries(entries);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <div>
      <StatsCards 
        metrics={userMetrics}
        recommendedCalories={recommendedCalories}
        hasMetrics={hasMetrics}
        weightEntries={weightEntries}
      />
      
      {hasMetrics && (
        <div className="mt-8">
          <MotivationalMessage
            currentWeight={userMetrics.currentWeight}
            targetWeight={userMetrics.targetWeight}
            targetDays={userMetrics.targetDays}
          />
        </div>
      )}
      
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
          />
        </div>
      )}

      <div className="mt-8">
        <MealPlan dailyCalories={recommendedCalories} />
      </div>
    </div>
  );
};

export default DashboardContent;