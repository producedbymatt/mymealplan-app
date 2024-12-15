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
  const [recommendedCalories, setRecommendedCalories] = useState(1200);

  const handleBMICalculated = (bmi: number) => {
    console.log("BMI calculated:", bmi);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          MyMealPlan.App
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          Track your weight loss journey, calculate your recommended daily calorie and protein intake, and get a custom meal plan designed to meet your goals.
        </p>
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
            <CalorieCalculator 
              {...userMetrics} 
              onCaloriesCalculated={(calories: number) => {
                console.log("Setting recommended calories:", calories);
                setRecommendedCalories(calories);
              }}
            />
          </div>
        )}
        <div className="mt-8">
          <MealPlan dailyCalories={recommendedCalories} />
        </div>
      </div>
    </div>
  );
};

export default Index;