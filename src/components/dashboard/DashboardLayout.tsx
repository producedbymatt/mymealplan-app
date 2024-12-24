import React from "react";
import MetricsPrompt from "@/components/dashboard/MetricsPrompt";
import DashboardContent from "@/components/dashboard/DashboardContent";

interface DashboardLayoutProps {
  hasMetrics: boolean;
  userMetrics: {
    height: number;
    currentWeight: number;
    targetWeight: number;
    targetDays: number;
    gender?: "male" | "female";
  };
  onMetricsUpdate: (height: number, weight: number) => void;
  onGoalSet: (weight: number, days: number) => void;
  onCaloriesCalculated: (calories: number) => void;
  onSaveMetrics: () => void;
}

const DashboardLayout = ({
  hasMetrics,
  userMetrics,
  onMetricsUpdate,
  onGoalSet,
  onCaloriesCalculated,
  onSaveMetrics
}: DashboardLayoutProps) => {
  return (
    <div className="w-full bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-foreground">
          Your Goals, Your Meals, Your Plan.
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
          Calculate your recommended daily calorie and protein intake, get a custom meal plan designed to meet your goals, and track your progress.
        </p>

        {!hasMetrics && <MetricsPrompt />}
        
        <div className="mt-8">
          <DashboardContent
            userMetrics={userMetrics}
            hasMetrics={hasMetrics}
            onMetricsUpdate={onMetricsUpdate}
            onGoalSet={onGoalSet}
            onCaloriesCalculated={onCaloriesCalculated}
            onSaveMetrics={onSaveMetrics}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;