import BMICalculator from "@/components/BMICalculator";
import WeightTracker from "@/components/WeightTracker";
import CalorieCalculator from "@/components/CalorieCalculator";
import MealPlan from "@/components/MealPlan";

interface DashboardContentProps {
  userMetrics: {
    height: number;
    currentWeight: number;
    targetWeight: number;
    targetDays: number;
  };
  recommendedCalories: number;
  onMetricsUpdate: (height: number, weight: number) => void;
  onGoalSet: (weight: number, days: number) => void;
  onCaloriesCalculated: (calories: number) => void;
}

const DashboardContent = ({
  userMetrics,
  recommendedCalories,
  onMetricsUpdate,
  onGoalSet,
  onCaloriesCalculated,
}: DashboardContentProps) => {
  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <div>
          <BMICalculator 
            onBMICalculated={console.log}
            onMetricsUpdate={onMetricsUpdate}
          />
        </div>
        <div className="md:col-span-2">
          <WeightTracker
            onGoalSet={onGoalSet}
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
    </>
  );
};

export default DashboardContent;