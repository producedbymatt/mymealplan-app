import React, { useState } from "react";
import BMICalculator from "@/components/BMICalculator";
import WeightTracker from "@/components/WeightTracker";
import MealPlan from "@/components/MealPlan";
import CalorieCalculator from "@/components/CalorieCalculator";

const Index = () => {
  const [userMetrics, setUserMetrics] = useState({
    height: 0,
    currentWeight: 0,
    targetWeight: 0,
    targetDays: 0,
  });

  const handleBMICalculated = (bmi: number) => {
    console.log("BMI calculated:", bmi);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Your Weight Loss Journey
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <BMICalculator 
              onBMICalculated={handleBMICalculated}
              onMetricsUpdate={(height, weight) => {
                setUserMetrics(prev => ({
                  ...prev,
                  height,
                  currentWeight: weight
                }));
              }}
            />
          </div>
          <div className="md:col-span-2">
            <WeightTracker
              onGoalSet={(weight, days) => {
                setUserMetrics(prev => ({
                  ...prev,
                  targetWeight: weight,
                  targetDays: days
                }));
              }}
            />
          </div>
        </div>
        {userMetrics.height > 0 && userMetrics.targetWeight > 0 && (
          <div className="mt-8">
            <CalorieCalculator {...userMetrics} />
          </div>
        )}
        <div className="mt-8">
          <MealPlan />
        </div>
      </div>
    </div>
  );
};

export default Index;