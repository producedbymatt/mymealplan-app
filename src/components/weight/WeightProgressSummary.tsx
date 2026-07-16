import { Card, CardContent } from "@/components/ui/card";
import { WeightEntry } from "@/hooks/useWeightLogs";
import { formatWeight } from "@/lib/utils";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

interface WeightProgressSummaryProps {
  entries: WeightEntry[];
  label: string;
}

const WeightProgressSummary = ({ entries, label }: WeightProgressSummaryProps) => {
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
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white/70 text-sm font-medium uppercase tracking-wide">
              {label} Weight Progress
            </p>
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
