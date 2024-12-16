import BMICalculator from "@/components/BMICalculator";
import WeightTracker from "@/components/WeightTracker";
import WeightGoal from "@/components/WeightGoal";
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
      <StatsCards 
        metrics={userMetrics}
        recommendedCalories={recommendedCalories}
        hasMetrics={hasMetrics}
        weightEntries={weightEntries}
      />
      
      {hasMetrics && (
        <MotivationalMessage
          currentWeight={userMetrics.currentWeight}
          targetWeight={userMetrics.targetWeight}
          targetDays={userMetrics.targetDays}
        />
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

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Weight Progress Tracker</h2>
        <WeightTracker 
          onWeightEntriesChange={handleWeightEntry}
          showGoalInputs={false}
        />
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