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
  isAuthenticated?: boolean;
}

const MetricCards = ({
  mostRecentWeight,
  heightFeet,
  heightInches,
  targetWeight,
  recommendedCalories,
  startingWeight,
  isAuthenticated = true,
}: MetricCardsProps) => {
  const calculateWeightLoss = () => {
    if (!startingWeight) return 0;
    const weightLoss = startingWeight - mostRecentWeight;
    return Math.abs(weightLoss);
  };

  const weightLoss = calculateWeightLoss();
  const isWeightLoss = startingWeight ? startingWeight > mostRecentWeight : false;

  const formatValue = (value: any, suffix: string = "") => {
    if (!isAuthenticated) return "N/A";
    return value ? `${value}${suffix}` : "Not Set";
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-green-950/90 to-blue-950/90 animate-gradient-x" />
        <CardHeader className="relative z-10 p-0">
          <CardTitle className="text-white">Current Weight</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 p-0 mt-2">
          <div className="text-2xl font-bold text-white">{formatValue(mostRecentWeight, " lbs")}</div>
          <p className="text-xs text-white/80 mt-1">
            Height: {isAuthenticated ? `${heightFeet}'${heightInches}"` : "N/A"}
          </p>
        </CardContent>
      </Card>

      <Card className="p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-green-950/90 to-blue-950/90 animate-gradient-x" />
        <CardHeader className="relative z-10 p-0">
          <CardTitle className="text-white">Target Weight</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 p-0 mt-2">
          <div className="text-2xl font-bold text-white">
            {formatValue(targetWeight, " lbs")}
          </div>
          <p className="text-xs text-white/80 mt-1">
            {isAuthenticated 
              ? targetWeight 
                ? `${Math.abs(mostRecentWeight - targetWeight)} lbs to go` 
                : "Set a goal to track progress"
              : "Sign in to set goals"}
          </p>
        </CardContent>
      </Card>

      <Card className="p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-green-950/90 to-blue-950/90 animate-gradient-x" />
        <CardHeader className="relative z-10 p-0">
          <CardTitle className="text-white">Weight Progress</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 p-0 mt-2">
          <div className="text-2xl font-bold text-white">
            {isAuthenticated 
              ? startingWeight 
                ? `${weightLoss.toFixed(1)} lbs` 
                : "No data"
              : "N/A"}
          </div>
          <p className="text-xs text-white/80 mt-1">
            {isAuthenticated
              ? startingWeight 
                ? `${isWeightLoss ? 'Lost' : 'Gained'} since starting` 
                : "Start logging to track progress"
              : "Sign in to track progress"}
          </p>
        </CardContent>
      </Card>

      <Card className="p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-green-950/90 to-blue-950/90 animate-gradient-x" />
        <CardHeader className="relative z-10 p-0">
          <CardTitle className="text-white">Daily Calories</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 p-0 mt-2">
          <div className="text-2xl font-bold text-white">{formatValue(recommendedCalories)}</div>
          <p className="text-xs text-white/80 mt-1">
            {isAuthenticated ? "Recommended intake" : "Sign in for recommendations"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricCards;