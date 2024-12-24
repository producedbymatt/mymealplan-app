import React, { useState } from "react";
import StatsCards from "./StatsCards";
import { useSession } from "@supabase/auth-helpers-react";

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
  onMetricsUpdate,
  onGoalSet,
  onCaloriesCalculated,
  onSaveMetrics
}: DashboardContentProps) => {
  const session = useSession();
  const isAuthenticated = !!session;

  return (
    <div className="space-y-8">
      <StatsCards
        metrics={userMetrics}
        hasMetrics={hasMetrics}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default DashboardContent;