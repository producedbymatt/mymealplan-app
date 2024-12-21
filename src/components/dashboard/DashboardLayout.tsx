import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  recommendedCalories: number;
  onMetricsUpdate: (height: number, weight: number) => void;
  onGoalSet: (weight: number, days: number) => void;
  onCaloriesCalculated: (calories: number) => void;
  onSaveMetrics: () => void;
}

const DashboardLayout = ({
  hasMetrics,
  userMetrics,
  recommendedCalories,
  onMetricsUpdate,
  onGoalSet,
  onCaloriesCalculated,
  onSaveMetrics
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col">
      <div className="container mx-auto px-4 flex-grow">
        <Header />
        <h1 className="text-4xl font-bold text-center mb-4">
          Your Goals, Your Meals, Your Plan.
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          Calculate your recommended daily calorie and protein intake, get a custom meal plan designed to meet your goals, and track your progress.
        </p>

        {!hasMetrics && <MetricsPrompt />}
        
        <div className="mt-8">
          <DashboardContent
            userMetrics={userMetrics}
            recommendedCalories={recommendedCalories}
            hasMetrics={hasMetrics}
            onMetricsUpdate={onMetricsUpdate}
            onGoalSet={onGoalSet}
            onCaloriesCalculated={onCaloriesCalculated}
            onSaveMetrics={onSaveMetrics}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;