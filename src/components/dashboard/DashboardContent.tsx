import BMICalculator from "@/components/BMICalculator";
import WeightTracker from "@/components/WeightTracker";
import CalorieCalculator from "@/components/CalorieCalculator";
import MealPlan from "@/components/MealPlan";
import StatsCards from "./StatsCards";
import MotivationalMessage from "./MotivationalMessage";
import { useState } from "react";

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

  const handleWeightEntry = (entries: WeightEntry[]) => {
    console.log("New weight entries:", entries);
    setWeightEntries(entries);
  };

  return (
    <div>
      {hasMetrics && (
        <MotivationalMessage
          currentWeight={userMetrics.currentWeight}
          targetWeight={userMetrics.targetWeight}
          targetDays={userMetrics.targetDays}
        />
      )}
      
      <StatsCards 
        metrics={userMetrics}
        recommendedCalories={recommendedCalories}
        hasMetrics={hasMetrics}
        weightEntries={weightEntries}
      />
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <BMICalculator
            onBMICalculated={() => {}}
            onMetricsUpdate={onMetricsUpdate}
          />
        </div>
        <div className="md:col-span-2">
          <WeightTracker 
            onGoalSet={onGoalSet}
            onWeightEntriesChange={handleWeightEntry}
          />
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