import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Scale, Target } from "lucide-react";
import { formatWeight } from "@/lib/utils";
import WeightGoal from "@/components/WeightGoal";

interface MetricCardsProps {
  mostRecentWeight: number;
  heightFeet: number;
  heightInches: number;
  targetWeight: number;
  daysRemaining: number;
  formattedTargetDate: string;
  targetDays: number;
  startingWeight?: number;
  isAuthenticated?: boolean;
}

const MetricCards = ({
  mostRecentWeight,
  heightFeet,
  heightInches,
  targetWeight,
  isAuthenticated = true,
}: MetricCardsProps) => {
  const [goalOpen, setGoalOpen] = useState(false);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-green-950/90 to-blue-950/90 animate-gradient-x" />
        <CardHeader className="relative z-10 p-0 flex flex-row items-center justify-between gap-2">
          <CardTitle className="text-white">Current Weight</CardTitle>
          {isAuthenticated && (
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <Link to="/weight-tracking">
                <Scale className="mr-1 h-4 w-4" />
                New Weight
              </Link>
            </Button>
          )}
        </CardHeader>
        <CardContent className="relative z-10 p-0 mt-2">
          <div className="text-2xl font-bold text-white">{isAuthenticated ? `${formatWeight(mostRecentWeight)} lbs` : "N/A"}</div>
          <p className="text-xs text-white/80 mt-1">
            Height: {isAuthenticated ? `${heightFeet}'${heightInches}"` : "N/A"}
          </p>
        </CardContent>
      </Card>

      <Card className="p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-green-950/90 to-blue-950/90 animate-gradient-x" />
        <CardHeader className="relative z-10 p-0 flex flex-row items-center justify-between gap-2">
          <CardTitle className="text-white">Target Weight</CardTitle>
          {isAuthenticated && (
            <Dialog open={goalOpen} onOpenChange={setGoalOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="secondary" className="h-8">
                  <Target className="mr-1 h-4 w-4" />
                  Edit Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Update Weight Goal</DialogTitle>
                </DialogHeader>
                <WeightGoal onGoalSet={() => setGoalOpen(false)} collapsible={false} />
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent className="relative z-10 p-0 mt-2">
          <div className="text-2xl font-bold text-white">
            {isAuthenticated ? `${formatWeight(targetWeight)} lbs` : "N/A"}
          </div>
          <p className="text-xs text-white/80 mt-1">
            {isAuthenticated
              ? targetWeight
                ? `${formatWeight(Math.abs(mostRecentWeight - targetWeight))} lbs to go`
                : "Set a goal to track progress"
              : "Sign in to set goals"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricCards;
