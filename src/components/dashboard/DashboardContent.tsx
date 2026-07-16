import React from "react";
import StatsCards from "./StatsCards";
import { useSession } from "@supabase/auth-helpers-react";
import MotivationalMessage from "./MotivationalMessage";
import DashboardSummaries from "./DashboardSummaries";

interface DashboardContentProps {
  userMetrics: {
    height: number;
    currentWeight: number;
    targetWeight: number;
    targetDays: number;
    gender?: "male" | "female";
  };
  hasMetrics: boolean;
  onMetricsUpdate: (height: number, weight: number) => void;
  onGoalSet: (weight: number, days: number) => void;
  onCaloriesCalculated: (calories: number) => void;
  onSaveMetrics: () => void;
}

const DashboardContent = ({
  userMetrics,
  hasMetrics,
}: DashboardContentProps) => {
  const session = useSession();
  const isAuthenticated = !!session;

  return (
    <div className="space-y-8">
      {hasMetrics && (
        <MotivationalMessage
          currentWeight={userMetrics.currentWeight}
          targetWeight={userMetrics.targetWeight}
          targetDays={userMetrics.targetDays}
        />
      )}
      <StatsCards
        metrics={userMetrics}
        hasMetrics={hasMetrics}
        isAuthenticated={isAuthenticated}
      />
      {hasMetrics && isAuthenticated && <DashboardSummaries />}
    </div>
  );
};

export default DashboardContent;
