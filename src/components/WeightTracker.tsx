import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface WeightEntry {
  date: string;
  weight: number;
}

interface WeightTrackerProps {
  onGoalSet?: (weight: number, days: number) => void;
}

const WeightTracker = ({ onGoalSet }: WeightTrackerProps) => {
  const [entries, setEntries] = React.useState<WeightEntry[]>([]);
  const [newWeight, setNewWeight] = React.useState("");
  const [targetWeight, setTargetWeight] = React.useState("");
  const [targetDays, setTargetDays] = React.useState("");

  const addWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(newWeight);
    
    if (isNaN(weight)) {
      return;
    }

    const newEntry = {
      date: new Date().toLocaleDateString(),
      weight,
    };

    setEntries([...entries, newEntry]);
    setNewWeight("");
  };

  const setGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(targetWeight);
    const days = parseInt(targetDays);

    if (isNaN(weight) || isNaN(days)) {
      return;
    }

    if (onGoalSet) {
      onGoalSet(weight, days);
    }
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Weight Tracker</h2>
      
      <div className="mb-6 space-y-4">
        <form onSubmit={setGoal} className="space-y-4">
          <div>
            <Input
              type="number"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              placeholder="Target weight (lbs)"
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="number"
              value={targetDays}
              onChange={(e) => setTargetDays(e.target.value)}
              placeholder="Days to achieve"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">Set Goal</Button>
        </form>

        <Separator className="my-4" />

        <form onSubmit={addWeight} className="flex gap-4">
          <Input
            type="number"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="Enter today's weight (lbs)"
            className="flex-1"
          />
          <Button type="submit">Log Weight</Button>
        </form>
      </div>

      <div className="h-[300px] w-full">
        {entries.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={entries}>
              <XAxis dataKey="date" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#4FD1C5"
                strokeWidth={2}
                dot={{ fill: "#4FD1C5" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Log your weight to see your progress chart
          </div>
        )}
      </div>
    </Card>
  );
};

export default WeightTracker;