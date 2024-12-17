import BMICalculator from "@/components/BMICalculator";
import WeightTracker from "@/components/WeightTracker";
import WeightGoal from "@/components/WeightGoal";
import CalorieCalculator from "@/components/CalorieCalculator";
import MealPlan from "@/components/MealPlan";
import StatsCards from "./StatsCards";
import MotivationalMessage from "./MotivationalMessage";
import { useState, useEffect } from "react";
import { useWeightLogs } from "@/hooks/useWeightLogs";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { loadWeightLogs } = useWeightLogs(false);

  const loadEntries = async () => {
    console.log("Loading weight entries...");
    const entries = await loadWeightLogs();
    if (entries) {
      console.log("Weight entries loaded:", entries);
      setWeightEntries(entries);
    }
  };

  // Load weight entries when component mounts
  useEffect(() => {
    loadEntries();
  }, []);

  const handleWeightEntry = (entries: WeightEntry[]) => {
    console.log("New weight entries:", entries);
    setWeightEntries(entries);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    console.log("Refreshing stats...");
    try {
      await loadEntries();
      toast.success("Stats refreshed successfully");
    } catch (error) {
      console.error("Error refreshing stats:", error);
      toast.error("Failed to refresh stats");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div>
      <StatsCards 
        metrics={userMetrics}
        recommendedCalories={recommendedCalories}
        hasMetrics={hasMetrics}
        weightEntries={weightEntries}
      />
      
      <div className="flex justify-center mb-8">
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Stats
        </Button>
      </div>
      
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