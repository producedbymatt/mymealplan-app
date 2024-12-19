import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

interface WeightGoalProps {
  onGoalSet: (weight: number, days: number) => void;
}

const WeightGoal = ({ onGoalSet }: WeightGoalProps) => {
  const [targetWeight, setTargetWeight] = React.useState("");
  const [targetDays, setTargetDays] = React.useState("");
  const [lastUpdated, setLastUpdated] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(() => {
    const stored = localStorage.getItem("weightGoalOpen");
    return stored === null ? true : stored === "true";
  });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("weightGoalOpen", isOpen.toString());
    loadWeightGoal();
  }, [isOpen]);

  const loadWeightGoal = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      console.log('Loading weight goal for user:', user.id);
      
      const { data, error } = await supabase
        .from('user_metrics')
        .select('target_weight, target_days, updated_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error loading weight goal:', error);
        return;
      }

      if (data) {
        console.log('Loaded weight goal:', data);
        setTargetWeight(data.target_weight?.toString() || "");
        setTargetDays(data.target_days?.toString() || "");
        if (data.updated_at) {
          setLastUpdated(format(new Date(data.updated_at), 'MMMM d, yyyy'));
        }
      }
    } catch (error) {
      console.error('Error in loadWeightGoal:', error);
    }
  };

  const setGoal = async (e: React.FormEvent) => {
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

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to set a goal",
          variant: "destructive",
        });
        return;
      }

      console.log('Saving weight goal:', { weight, days });
      const now = new Date().toISOString();

      const { error } = await supabase
        .from('user_metrics')
        .upsert({
          user_id: user.id,
          target_weight: weight,
          target_days: days,
          updated_at: now
        });

      if (error) {
        console.error('Error saving weight goal:', error);
        toast({
          title: "Error",
          description: "Failed to save weight goal",
          variant: "destructive",
        });
        return;
      }

      setLastUpdated(format(new Date(now), 'MMMM d, yyyy'));
      onGoalSet(weight, days);
      toast({
        title: "Goal Set!",
        description: `Aiming to reach ${weight} lbs in ${days} days.`,
      });
    } catch (error) {
      console.error('Error in setGoal:', error);
      toast({
        title: "Error",
        description: "Failed to set goal",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-center">Weight Goal</h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
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
            {lastUpdated && (
              <p className="text-sm text-gray-500 text-center mt-2">
                Last updated: {lastUpdated}
              </p>
            )}
          </form>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default WeightGoal;