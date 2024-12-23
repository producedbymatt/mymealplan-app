import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CaloriesSummaryCardProps {
  todayCalories: number;
  recommendedCalories: number | null;
}

const CaloriesSummaryCard = ({ todayCalories, recommendedCalories }: CaloriesSummaryCardProps) => {
  return (
    <Card className="bg-gradient-to-r from-blue-950/90 to-green-950/90">
      <CardHeader>
        <CardTitle className="text-white">Today's Calories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bold text-white">{todayCalories}</p>
          {recommendedCalories && (
            <p className="text-2xl font-semibold text-green-400">
              Target: {recommendedCalories}
            </p>
          )}
        </div>
        {recommendedCalories && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  todayCalories > recommendedCalories ? 'bg-red-600' : 'bg-green-600'
                }`}
                style={{
                  width: `${Math.min((todayCalories / recommendedCalories) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CaloriesSummaryCard;