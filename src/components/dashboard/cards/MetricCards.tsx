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
}: MetricCardsProps) => {
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
          <div className="text-2xl font-bold">{targetWeight} lbs</div>
          <p className="text-xs text-muted-foreground mt-1">
            {Math.abs(mostRecentWeight - targetWeight)} lbs to go
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Days to Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{daysRemaining} days</div>
          <p className="text-xs text-muted-foreground mt-1">
            {formattedTargetDate} / {targetDays} day goal
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