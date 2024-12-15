import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const addWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(newWeight);
    
    if (isNaN(weight)) {
      toast({
        title: "Invalid Weight",
        description: "Please enter a valid weight value.",
        variant: "destructive",
      });
      return;
    }

    const newEntry = {
      date: new Date().toLocaleDateString(),
      weight,
    };

    setEntries([...entries, newEntry]);
    setNewWeight("");

    if (entries.length > 0 && targetWeight) {
      const weightLoss = entries[0].weight - weight;
      const targetLoss = entries[0].weight - parseFloat(targetWeight);
      const progressPercentage = (weightLoss / targetLoss) * 100;
      
      if (weightLoss >= 5) {
        toast({
          title: "Milestone Achieved! 🎉",
          description: `Congratulations! You've lost ${weightLoss.toFixed(1)} lbs!`,
        });
      }

      if (progressPercentage >= 50 && progressPercentage < 51) {
        toast({
          title: "Halfway There! 🎉",
          description: "You're halfway to your goal weight!",
        });
      }
    }
  };

  const setGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(targetWeight);
    const days = parseInt(targetDays);

    if (isNaN(weight) || isNaN(days)) {
      toast({
        title: "Invalid Goal",
        description: "Please enter valid weight and days values.",
        variant: "destructive",
      });
      return;
    }

    if (onGoalSet) {
      onGoalSet(weight, days);
    }

    toast({
      title: "Goal Set!",
      description: `Aiming to reach ${weight} lbs in ${days} days.`,
    });
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