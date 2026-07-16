import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WeightEntry } from "@/hooks/useWeightLogs";
import { formatWeight } from "@/lib/utils";
import { TrendingDown, TrendingUp, Minus, List } from "lucide-react";
import { Link } from "react-router-dom";

interface WeightProgressSummaryProps {
  entries: WeightEntry[];
  label: string;
  showViewAll?: boolean;
}

const WeightProgressSummary = ({ entries, label, showViewAll = true }: WeightProgressSummaryProps) => {
  if (entries.length < 2) {
    return (
      <Card className="mb-6 bg-gradient-to-r from-blue-950/90 to-green-950/90 border-0">
        <CardContent className="p-6 text-center">
          <p className="text-white/80 text-sm">
            Log at least two weight entries to see your {label} progress.
          </p>
        </CardContent>
      </Card>
    );
  }

  const sorted = [...entries].sort((a, b) => {
    const dateA = new Date(a.created_at || "").getTime();
    const dateB = new Date(b.created_at || "").getTime();
    return dateA - dateB;
  });

  const startWeight = sorted[0].weight;
  const endWeight = sorted[sorted.length - 1].weight;
  const difference = endWeight - startWeight;
  const formattedDiff = formatWeight(Math.abs(difference));

  let icon = <Minus className="h-6 w-6 text-gray-300" />;
  let colorClass = "text-gray-300";
  let message = "No change";

  if (difference > 0) {
    icon = <TrendingUp className="h-6 w-6 text-red-300" />;
    colorClass = "text-red-300";
    message = `Gained ${formattedDiff} lbs`;
  } else if (difference < 0) {
    icon = <TrendingDown className="h-6 w-6 text-green-300" />;
    colorClass = "text-green-300";
    message = `Lost ${formattedDiff} lbs`;
  }

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-950/90 to-green-950/90 border-0">
      <CardHeader className="relative z-10 flex flex-row items-center justify-between p-6 pb-0">
        <CardTitle className="text-white text-base">{label} Weight Progress</CardTitle>
        <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/20">
          <Link to="/weight-tracking">
            <List className="mr-1 h-4 w-4" />
            View All
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-6 pt-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
              {icon}
              <p className={`text-3xl font-bold ${colorClass}`}>
                {message}
              </p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-white/70 text-sm">Start: {formatWeight(startWeight)} lbs</p>
            <p className="text-white/70 text-sm">Current: {formatWeight(endWeight)} lbs</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeightProgressSummary;
