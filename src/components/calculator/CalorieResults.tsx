import React from "react";

interface CalorieResultsProps {
  dailyCalories: number;
  minProtein: number;
  maxProtein: number;
  targetWeight: number;
  targetDays: number;
  weeklyChange: number;
  isGainingWeight: boolean;
}

const CalorieResults = ({
  dailyCalories,
  minProtein,
  maxProtein,
  targetWeight,
  targetDays,
  weeklyChange,
  isGainingWeight,
}: CalorieResultsProps) => {
  const getWeightChangeWarning = (weeklyChange: number) => {
    if (weeklyChange > 2) {
      return {
        message: `Your target may be too aggressive. A safe weight ${isGainingWeight ? 'gain' : 'loss'} rate is 1-2 pounds per week.`,
        color: "text-red-500"
      };
    }
    if (weeklyChange === 0) {
      return {
        message: "Your current weight matches your target weight.",
        color: "text-green-500"
      };
    }
    return {
      message: `Your target is within a healthy weight ${isGainingWeight ? 'gain' : 'loss'} range of 1-2 pounds per week.`,
      color: "text-green-500"
    };
  };

  const weightChangeWarning = getWeightChangeWarning(weeklyChange);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-lg font-semibold">
          Recommended Daily Calories:
          <span className="block text-2xl text-green-600">{dailyCalories} calories</span>
        </p>
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold">
          Daily Protein Target:
          <span className="block text-2xl text-blue-600">{minProtein}-{maxProtein}g</span>
        </p>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm text-center">
          To reach your goal weight of {targetWeight} lbs in {targetDays} days, you should aim to {isGainingWeight ? 'gain' : 'lose'} approximately{" "}
          <span className="font-semibold">{weeklyChange.toFixed(1)} lbs per week</span>
        </p>
        <p className={`text-sm text-center mt-2 ${weightChangeWarning.color}`}>
          {weightChangeWarning.message}
        </p>
      </div>

      <div className="text-xs text-gray-500 text-center mt-2">
        * Adjust your intake based on how you feel and your progress. These are general guidelines.
      </div>
    </div>
  );
};

export default CalorieResults;