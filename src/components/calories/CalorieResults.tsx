interface CalorieResultsProps {
  dailyCalories: number;
  minProtein: number;
  maxProtein: number;
  targetWeight: number;
  targetDays: number;
  weeklyChange: number;
  warningMessage: string;
  warningColor: string;
  bmr: number;
  activityLevel: number;
}

const CalorieResults = ({
  dailyCalories,
  minProtein,
  maxProtein,
  targetWeight,
  targetDays,
  weeklyChange,
  warningMessage,
  warningColor,
  bmr,
  activityLevel,
}: CalorieResultsProps) => {
  const tdee = Math.round(bmr * activityLevel);
  const calorieDeficitOrSurplus = Math.abs(dailyCalories - tdee);
  const weeklyWeightChange = (calorieDeficitOrSurplus * 7) / 3500; // 3500 calories = 1 pound

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-lg font-semibold">
          Recommended Daily Calories:
          <span className="block text-2xl text-green-500 dark:text-green-400">{dailyCalories} calories</span>
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg space-y-2 text-center">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300">Your Daily Energy Breakdown:</h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <span className="font-bold">•</span> Basal Metabolic Rate (BMR): <span className="font-medium">{Math.round(bmr)} calories</span>
          <br />
          <span className="text-xs">This is what your body burns at complete rest</span>
        </p>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <span className="font-bold">•</span> Total Daily Energy Expenditure (TDEE): <span className="font-medium">{tdee} calories</span>
          <br />
          <span className="text-xs">This is your BMR adjusted for your activity level</span>
        </p>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <span className="font-bold">•</span> Daily {dailyCalories > tdee ? "Surplus" : "Deficit"}: <span className="font-medium">{calorieDeficitOrSurplus} calories</span>
          <br />
          <span className="text-xs">
            This {dailyCalories > tdee ? "surplus" : "deficit"} will help you {dailyCalories > tdee ? "gain" : "lose"} weight at your target rate
          </span>
          <br />
          <span className="text-xs font-medium mt-1 block">
            Expected weekly {dailyCalories > tdee ? "gain" : "loss"}: {weeklyWeightChange.toFixed(2)} lbs
          </span>
        </p>
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold">
          Daily Protein Target:
          <span className="block text-2xl text-blue-500 dark:text-blue-400">{minProtein}-{maxProtein}g</span>
        </p>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm text-center">
          To reach your goal weight of {targetWeight} lbs in {targetDays} days, you should aim to change approximately{" "}
          <span className="font-semibold">{weeklyChange.toFixed(1)} lbs per week</span>
        </p>
        <p className={`text-sm text-center mt-2 ${warningColor}`}>
          {warningMessage}
        </p>
      </div>

      <div className="text-xs text-muted-foreground text-center mt-2">
        * Adjust your intake based on how you feel and your progress. These are general guidelines.
      </div>
    </div>
  );
};

export default CalorieResults;