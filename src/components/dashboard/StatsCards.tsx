import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, addDays, differenceInDays, parseISO } from "date-fns";
import BMISlider from "./BMISlider";
import BMICategories from "./BMICategories";

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
}

const getBMICategory = (bmi: number, gender: "male" | "female" = "male") => {
  if (gender === "female") {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500", gradient: "bg-gradient-to-r from-blue-50 to-indigo-50" };
    if (bmi < 24) return { category: "Normal weight", color: "text-green-500", gradient: "bg-gradient-to-r from-green-50 to-emerald-50" };
    if (bmi < 29) return { category: "Overweight", color: "text-yellow-500", gradient: "bg-gradient-to-r from-yellow-50 to-amber-50" };
    return { category: "Obese", color: "text-red-500", gradient: "bg-gradient-to-r from-red-50 to-orange-50" };
  } else {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500", gradient: "bg-gradient-to-r from-blue-50 to-indigo-50" };
    if (bmi < 25) return { category: "Normal weight", color: "text-green-500", gradient: "bg-gradient-to-r from-green-50 to-emerald-50" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500", gradient: "bg-gradient-to-r from-yellow-50 to-amber-50" };
    return { category: "Obese", color: "text-red-500", gradient: "bg-gradient-to-r from-red-50 to-orange-50" };
  }
};

const calculateWeightForBMI = (height: number, targetBMI: number) => {
  return Math.round((targetBMI * height * height) / 703);
};

const StatsCards = ({ metrics, recommendedCalories, hasMetrics, weightEntries = [] }: StatsCardsProps) => {
  const [simulatedBMI, setSimulatedBMI] = React.useState<number | null>(null);

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

  const mostRecentWeight = weightEntries && weightEntries.length > 0 
    ? weightEntries[0].weight 
    : metrics.currentWeight;

  const bmi = (mostRecentWeight * 703) / (metrics.height * metrics.height);
  const bmiCategory = getBMICategory(bmi, metrics.gender);

  const heightFeet = Math.floor(metrics.height / 12);
  const heightInches = metrics.height % 12;

  const startDate = metrics.created_at ? parseISO(metrics.created_at) : new Date();
  const targetDate = addDays(startDate, metrics.targetDays);
  const daysRemaining = differenceInDays(targetDate, new Date());
  const formattedTargetDate = format(targetDate, 'dd/MM/yyyy');

  const underweightWeight = calculateWeightForBMI(metrics.height, 18.5);
  const normalWeight = calculateWeightForBMI(metrics.height, 24);
  const overweightWeight = calculateWeightForBMI(metrics.height, 29);

  return (
    <div className="space-y-4">
      <Card className={`w-full border-none ${bmiCategory.gradient}`}>
        <CardHeader className="text-center">
          <CardTitle>Current BMI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{bmi.toFixed(1)}</div>
            <p className={`text-sm ${bmiCategory.color} font-semibold`}>
              Category: {getBMICategory(bmi, metrics.gender).category}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on current weight: {mostRecentWeight} lbs, height: {heightFeet}'{heightInches}", gender: {metrics.gender || "not specified"}
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <BMISlider 
              bmi={bmi} 
              height={metrics.height}
              onBMIChange={(value) => setSimulatedBMI(value[0])}
            />
            
            <BMICategories
              underweightWeight={underweightWeight}
              normalWeight={normalWeight}
              overweightWeight={overweightWeight}
            />
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default StatsCards;
