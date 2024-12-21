interface CalorieResultsProps {
  dailyCalories: number;
  minProtein: number;
  maxProtein: number;
  targetWeight: number;
  targetDays: number;
  weeklyChange: number;
  warningMessage: string;
  warningColor: string;
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
}: CalorieResultsProps) => {
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
          To reach your goal weight of {targetWeight} lbs in {targetDays} days, you should aim to change approximately{" "}
          <span className="font-semibold">{weeklyChange.toFixed(1)} lbs per week</span>
        </p>
        <p className={`text-sm text-center mt-2 ${warningColor}`}>
          {warningMessage}
        </p>
      </div>

      <div className="text-xs text-gray-500 text-center mt-2">
        * Adjust your intake based on how you feel and your progress. These are general guidelines.
      </div>
    </div>
  );
};

export default CalorieResults;