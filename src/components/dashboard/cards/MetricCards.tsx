import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MetricCardsProps {
  mostRecentWeight: number;
  heightFeet: number;
  heightInches: number;
  targetWeight: number;
  daysRemaining: number;
  formattedTargetDate: string;
  targetDays: number;
  recommendedCalories: number;
  startingWeight?: number;
}

const MetricCards = ({
  mostRecentWeight,
  heightFeet,
  heightInches,
  targetWeight,
  daysRemaining,
  formattedTargetDate,
  targetDays,
  recommendedCalories,
  startingWeight,
}: MetricCardsProps) => {
  const calculateWeightLoss = () => {
    if (!startingWeight) return 0;
    const weightLoss = startingWeight - mostRecentWeight;
    return Math.abs(weightLoss);
  };

  const weightLoss = calculateWeightLoss();
  const isWeightLoss = startingWeight ? startingWeight > mostRecentWeight : false;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-green-950/90 to-blue-950/90 animate-gradient-x" />
        <CardHeader className="relative z-10 p-0">
          <CardTitle className="text-white">Current Weight</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 p-0 mt-2">
          <div className="text-2xl font-bold text-white">{mostRecentWeight} lbs</div>
          <p className="text-xs text-white/80 mt-1">Height: {heightFeet}'{heightInches}"</p>
        </CardContent>
      </Card>

      <Card className="p-4 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-green-950/90 to-blue-950/90 animate-gradient-x" />
        <CardHeader className="relative z-10 p-0">
          <CardTitle className="text-white">Target Weight</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 p-0 mt-2">
          <div className="text-2xl font-bold text-white">
            {targetWeight ? `${targetWeight} lbs` : "Not Set"}
          </div>
          <p className="text-xs text-white/80 mt-1">
            {targetWeight ? `${Math.abs(mostRecentWeight - targetWeight)} lbs to go` : "Set a goal to track progress"}
          </p>
          {targetWeight && (
            <p className="text-xs text-white/80 mt-1">Target Date: {formattedTargetDate}</p>
          )}
        </CardContent>
      </Card>

      <Card className="p-4 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-green-950/90 to-blue-950/90 animate-gradient-x" />
        <CardHeader className="relative z-10 p-0">
          <CardTitle className="text-white">Weight Progress</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 p-0 mt-2">
          <div className="text-2xl font-bold text-white">
            {startingWeight ? `${weightLoss.toFixed(1)} lbs` : "No data"}
          </div>
          <p className="text-xs text-white/80 mt-1">
            {startingWeight 
              ? `${isWeightLoss ? 'Lost' : 'Gained'} since starting` 
              : "Start logging to track progress"}
          </p>
          {targetDays > 0 && (
            <p className="text-xs text-white/80 mt-1">{daysRemaining} days remaining</p>
          )}
        </CardContent>
      </Card>

      <Card className="p-4 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-green-950/90 to-blue-950/90 animate-gradient-x" />
        <CardHeader className="relative z-10 p-0">
          <CardTitle className="text-white">Daily Calories</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 p-0 mt-2">
          <div className="text-2xl font-bold text-white">{recommendedCalories}</div>
          <p className="text-xs text-white/80 mt-1">Recommended intake</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricCards;