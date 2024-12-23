import { format, addDays, differenceInDays, parseISO } from "date-fns";
import BMICard from "./cards/BMICard";
import MetricCards from "./cards/MetricCards";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  metrics: {
    height: number;
    currentWeight: number;
    targetWeight: number;
    targetDays: number;
    created_at?: string;
    gender?: "male" | "female";
  };
  recommendedCalories: number;
  hasMetrics: boolean;
  weightEntries?: { date: string; weight: number; }[];
  isAuthenticated?: boolean;
}

const calculateWeightForBMI = (height: number, targetBMI: number) => {
  return Math.round((targetBMI * height * height) / 703);
};

const StatsCards = ({ 
  metrics, 
  recommendedCalories, 
  hasMetrics, 
  weightEntries = [],
  isAuthenticated = true
}: StatsCardsProps) => {
  if (!hasMetrics && isAuthenticated) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">Enter your metrics to view stats</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const mostRecentWeight = weightEntries && weightEntries.length > 0 
    ? weightEntries[0].weight 
    : metrics.currentWeight;

  const bmi = (mostRecentWeight * 703) / (metrics.height * metrics.height);
  const heightFeet = Math.floor(metrics.height / 12);
  const heightInches = metrics.height % 12;

  const startDate = metrics.created_at ? parseISO(metrics.created_at) : new Date();
  const targetDate = addDays(startDate, metrics.targetDays);
  const daysRemaining = differenceInDays(targetDate, new Date());
  const formattedTargetDate = format(targetDate, 'MM/dd/yyyy');

  const underweightWeight = calculateWeightForBMI(metrics.height, 18.5);
  const normalWeight = calculateWeightForBMI(metrics.height, 24);
  const overweightWeight = calculateWeightForBMI(metrics.height, 29);

  return (
    <div className="space-y-4">
      <BMICard 
        bmi={bmi}
        mostRecentWeight={mostRecentWeight}
        heightFeet={heightFeet}
        heightInches={heightInches}
        height={metrics.height}
        gender={metrics.gender}
        underweightWeight={underweightWeight}
        normalWeight={normalWeight}
        overweightWeight={overweightWeight}
      />

      <MetricCards 
        mostRecentWeight={mostRecentWeight}
        heightFeet={heightFeet}
        heightInches={heightInches}
        targetWeight={metrics.targetWeight}
        daysRemaining={daysRemaining}
        formattedTargetDate={formattedTargetDate}
        targetDays={metrics.targetDays}
        recommendedCalories={recommendedCalories}
        startingWeight={metrics.currentWeight}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default StatsCards;