import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

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
  // Parse the date string correctly (assuming it comes in as dd/MM/yyyy)
  const [day, month, year] = formattedTargetDate.split('/').map(Number);
  const targetDate = new Date(year, month - 1, day); // month is 0-based in JS Date

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
          <CardTitle>Days to Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {targetDays ? `${daysRemaining} days` : "Not Set"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {targetDays 
              ? `${format(targetDate, 'MM/dd/yyyy')} / ${targetDays} day goal` 
              : "Set a timeline for your goal"}
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