import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

interface WeightGoalProps {
  onGoalSet: (weight: number, days: number) => void;
}

const WeightGoal = ({ onGoalSet }: WeightGoalProps) => {
  const [targetWeight, setTargetWeight] = useState<string>("");
  const [targetDays, setTargetDays] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(() => {
    const stored = localStorage.getItem("weightGoalOpen");
    return stored === null ? true : stored === "true";
  });

  useEffect(() => {
    localStorage.setItem("weightGoalOpen", isOpen.toString());
  }, [isOpen]);

  useEffect(() => {
    loadWeightGoal();
  }, []);

  const loadWeightGoal = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("No user found");
        return;
      }

      console.log("Loading weight goal for user:", user.id);

      const { data, error } = await supabase
        .from("user_metrics")
        .select("target_weight, target_days, updated_at")
        .eq("user_id", user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error loading weight goal:", error);
        return;
      }

      if (data) {
        console.log("Loaded weight goal:", data);
        setTargetWeight(data.target_weight?.toString() || "");
        setTargetDays(data.target_days?.toString() || "");
        if (data.updated_at) {
          setLastUpdated(format(new Date(data.updated_at), 'MMMM d, yyyy'));
        }
      }
    } catch (error) {
      console.error("Exception loading weight goal:", error);
    }
  };

  const setGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const weight = parseFloat(targetWeight);
      const days = parseInt(targetDays);

      if (isNaN(weight) || isNaN(days)) {
        toast.error("Please enter valid numbers for weight and days");
        return;
      }

      console.log("Saving weight goal:", { weight, days });

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("No user found");
        toast.error("Please log in to set a weight goal");
        return;
      }

      // First, get the current user metrics
      const { data: currentMetrics, error: fetchError } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error fetching current metrics:', fetchError);
        toast.error("Failed to fetch current metrics");
        return;
      }

      const now = new Date().toISOString();
      const metricsData = {
        user_id: user.id,
        target_weight: weight,
        target_days: days,
        updated_at: now,
        // Include existing values or defaults for required fields
        height: currentMetrics?.height || 0,
        current_weight: currentMetrics?.current_weight || 0,
        recommended_calories: currentMetrics?.recommended_calories || 2000,
        gender: currentMetrics?.gender || null
      };

      const { error } = await supabase
        .from('user_metrics')
        .upsert(metricsData)
        .select()
        .single();

      if (error) {
        console.error('Error saving weight goal:', error);
        toast.error("Failed to save weight goal");
        return;
      }

      setLastUpdated(format(new Date(now), 'MMMM d, yyyy'));
      onGoalSet(weight, days);
      toast.success("Weight goal updated successfully!");
    } catch (error) {
      console.error('Exception while saving weight goal:', error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between p-6">
          <CardTitle>Set Weight Goal</CardTitle>
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
          <CardContent>
            <form onSubmit={setGoal} className="space-y-4">
              <div>
                <label htmlFor="targetWeight" className="block text-sm font-medium mb-1">
                  Target Weight (lbs)
                </label>
                <Input
                  id="targetWeight"
                  type="number"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  placeholder="Enter target weight"
                  required
                />
              </div>
              <div>
                <label htmlFor="targetDays" className="block text-sm font-medium mb-1">
                  Days to Achieve Goal
                </label>
                <Input
                  id="targetDays"
                  type="number"
                  value={targetDays}
                  onChange={(e) => setTargetDays(e.target.value)}
                  placeholder="Enter number of days"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950" disabled={loading}>
                {loading ? "Saving..." : "Set Goal"}
              </Button>
              {lastUpdated && (
                <p className="text-sm text-muted-foreground text-center">
                  Last updated: {lastUpdated}
                </p>
              )}
            </form>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default WeightGoal;