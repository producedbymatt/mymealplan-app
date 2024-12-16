import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, addDays, differenceInDays, parseISO } from "date-fns";

interface StatsCardsProps {
  metrics: {
    height: number;
    currentWeight: number;
    targetWeight: number;
    targetDays: number;
    created_at?: string;
  };
  recommendedCalories: number;
  hasMetrics: boolean;
  weightEntries?: { date: string; weight: number; }[];
}

const StatsCards = ({ metrics, recommendedCalories, hasMetrics, weightEntries = [] }: StatsCardsProps) => {
  if (!hasMetrics) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Enter your metrics to view stats</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Target Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Enter your metrics to view stats</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Days to Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Enter your metrics to view stats</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Daily Calories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Enter your metrics to view stats</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get the most recent weight entry if available
  const mostRecentWeight = weightEntries && weightEntries.length > 0 
    ? weightEntries[weightEntries.length - 1].weight 
    : metrics.currentWeight;

  // Convert height from inches to feet and inches for display
  const heightFeet = Math.floor(metrics.height / 12);
  const heightInches = metrics.height % 12;

  // Calculate target date and days remaining
  if (!metrics.created_at) {
    console.error('No created_at date found in user_metrics. This should not happen.');
    return null;
  }

  const startDate = parseISO(metrics.created_at);
  const targetDate = addDays(startDate, metrics.targetDays);
  const daysRemaining = differenceInDays(targetDate, new Date());
  const formattedTargetDate = format(targetDate, 'dd/MM/yyyy');

  console.log('Days to Goal Calculation:', {
    startDate: format(startDate, 'dd/MM/yyyy'),
    targetDate: format(targetDate, 'dd/MM/yyyy'),
    targetDays: metrics.targetDays,
    daysRemaining,
    created_at: metrics.created_at
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
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
          <div className="text-2xl font-bold">{metrics.targetWeight} lbs</div>
          <p className="text-xs text-muted-foreground mt-1">
            {Math.abs(mostRecentWeight - metrics.targetWeight)} lbs to go
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
            {formattedTargetDate} / {metrics.targetDays} day goal
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

export default StatsCards;