import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface WeightGoalProps {
  onGoalSet: (weight: number, days: number) => void;
}

const WeightGoal = ({ onGoalSet }: WeightGoalProps) => {
  const [targetWeight, setTargetWeight] = React.useState("");
  const [targetDays, setTargetDays] = React.useState("");
  const { toast } = useToast();

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

    onGoalSet(weight, days);
    toast({
      title: "Goal Set!",
      description: `Aiming to reach ${weight} lbs in ${days} days.`,
    });
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Weight Goal</h2>
      <form onSubmit={setGoal} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Target Weight (lbs)</label>
          <Input
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            placeholder="Enter target weight"
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Days to Achieve</label>
          <Input
            type="number"
            value={targetDays}
            onChange={(e) => setTargetDays(e.target.value)}
            placeholder="Enter number of days"
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          Set Goal
        </Button>
      </form>
    </Card>
  );
};

export default WeightGoal;