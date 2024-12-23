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
      <Card className="relative overflow-hidden bg-gradient-to-br from-[#9b87f5]/20 via-[#9b87f5]/10 to-[#1A1F2C]/40 animate-gradient-x border-none">
        <div className="absolute inset-0 bg-black/50" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-white">Current Weight</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold text-white">{mostRecentWeight} lbs</div>
          <p className="text-xs text-white/80 mt-1">Height: {heightFeet}'{heightInches}"</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-gradient-to-br from-[#7E69AB]/20 via-[#7E69AB]/10 to-[#1A1F2C]/40 animate-gradient-x border-none">
        <div className="absolute inset-0 bg-black/50" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-white">Target Weight</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold text-white">
            {targetWeight ? `${targetWeight} lbs` : "Not Set"}
          </div>
          <p className="text-xs text-white/80 mt-1">
            {targetWeight ? `${Math.abs(mostRecentWeight - targetWeight)} lbs to go` : "Set a goal to track progress"}
          </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-gradient-to-br from-[#6E59A5]/20 via-[#6E59A5]/10 to-[#1A1F2C]/40 animate-gradient-x border-none">
        <div className="absolute inset-0 bg-black/50" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-white">Weight Progress</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold text-white">
            {startingWeight ? `${weightLoss.toFixed(1)} lbs` : "No data"}
          </div>
          <p className="text-xs text-white/80 mt-1">
            {startingWeight 
              ? `${isWeightLoss ? 'Lost' : 'Gained'} since starting` 
              : "Start logging to track progress"}
          </p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-gradient-to-br from-[#1A1F2C]/40 via-[#1A1F2C]/20 to-[#1A1F2C]/60 animate-gradient-x border-none">
        <div className="absolute inset-0 bg-black/50" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-white">Daily Calories</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold text-white">{recommendedCalories}</div>
          <p className="text-xs text-white/80 mt-1">Recommended intake</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricCards;