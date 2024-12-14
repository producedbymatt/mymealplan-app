import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/components/ui/use-toast";

interface WeightEntry {
  date: string;
  weight: number;
}

const WeightTracker = () => {
  const [entries, setEntries] = React.useState<WeightEntry[]>([]);
  const [newWeight, setNewWeight] = React.useState("");
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

    if (entries.length > 0) {
      const weightLoss = entries[0].weight - weight;
      if (weightLoss >= 5) {
        toast({
          title: "Milestone Achieved! 🎉",
          description: `Congratulations! You've lost ${weightLoss.toFixed(1)} kg!`,
        });
      }
    }
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Weight Tracker</h2>
      <form onSubmit={addWeight} className="mb-6 flex gap-4">
        <Input
          type="number"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
          placeholder="Enter today's weight (kg)"
          className="flex-1"
        />
        <Button type="submit">Log Weight</Button>
      </form>
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