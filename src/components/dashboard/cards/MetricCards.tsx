import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, differenceInDays, addDays, parseISO } from "date-fns";

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
  console.log('Calculating dates with:', { formattedTargetDate, targetDays, daysRemaining });
  
  // Get today's date at midnight for consistent day calculations
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Parse the target date string into a Date object
  const targetDate = parseISO(formattedTargetDate);
  
  // Calculate actual days remaining
  const actualDaysRemaining = Math.max(0, differenceInDays(targetDate, today));

  console.log('Date calculations:', {
    today: today.toISOString(),
    targetDate: targetDate.toISOString(),
    actualDaysRemaining
  });

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
            {targetDays ? `${actualDaysRemaining} days` : "Not Set"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {targetDays 
              ? `Target: ${format(targetDate, 'MM/dd/yyyy')} / ${targetDays} day goal` 
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