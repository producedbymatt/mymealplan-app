import React from "react";
import BMICalculator from "@/components/BMICalculator";
import WeightTracker from "@/components/WeightTracker";
import MealPlan from "@/components/MealPlan";

const Index = () => {
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
            <BMICalculator onBMICalculated={handleBMICalculated} />
          </div>
          <div className="md:col-span-2">
            <WeightTracker />
          </div>
        </div>
        <div className="mt-8">
          <MealPlan />
        </div>
      </div>
    </div>
  );
};

export default Index;