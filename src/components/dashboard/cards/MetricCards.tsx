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
      <Card>
        <CardHeader>
          <CardTitle>Current Weight</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mostRecentWeight} lbs</div>
          <p className="text-xs text-muted-foreground mt-1">Height: {heightFeet}'{heightInches}"</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Target Weight</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {targetWeight ? `${targetWeight} lbs` : "Not Set"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {targetWeight ? `${Math.abs(mostRecentWeight - targetWeight)} lbs to go` : "Set a goal to track progress"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Weight Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {startingWeight ? `${weightLoss.toFixed(1)} lbs` : "No data"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {startingWeight 
              ? `${isWeightLoss ? 'Lost' : 'Gained'} since starting` 
              : "Start logging to track progress"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Daily Calories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{recommendedCalories}</div>
          <p className="text-xs text-muted-foreground mt-1">Recommended intake</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricCards;