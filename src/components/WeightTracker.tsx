import React, { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWeightLogs, WeightEntry } from "@/hooks/useWeightLogs";
import WeightChart from "./weight/WeightChart";
import WeightTable from "./weight/WeightTable";
import WeightProgressSummary from "./weight/WeightProgressSummary";
import ProgressPhotos from "./weight/ProgressPhotos";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { subMonths, subYears, isAfter } from "date-fns";

type TimeFilter = "all" | "1y" | "6m" | "3m";

interface WeightTrackerProps {
  onWeightEntriesChange?: (entries: WeightEntry[]) => void;
  showGoalInputs?: boolean;
}

const filterOptions: { label: string; value: TimeFilter }[] = [
  { label: "All Time", value: "all" },
  { label: "1 Year", value: "1y" },
  { label: "6 Months", value: "6m" },
  { label: "3 Months", value: "3m" },
];

const WeightTracker = ({ onWeightEntriesChange }: WeightTrackerProps) => {
  const [newWeight, setNewWeight] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const { entries, loadWeightLogs, addWeight, editWeight, deleteWeight } = useWeightLogs(showMore);

  const filteredEntries = useMemo(() => {
    if (timeFilter === "all") return entries;

    const now = new Date();
    const cutoff =
      timeFilter === "1y"
        ? subYears(now, 1)
        : timeFilter === "6m"
        ? subMonths(now, 6)
        : subMonths(now, 3);

    return entries.filter((entry) => {
      const entryDate = entry.created_at ? new Date(entry.created_at) : new Date(entry.date);
      return isAfter(entryDate, cutoff) || entryDate.getTime() === cutoff.getTime();
    });
  }, [entries, timeFilter]);

  useEffect(() => {
    loadWeightLogs();
  }, [showMore]);

  const updateUserMetrics = async (weight: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No user found');
        return;
      }

      console.log('Updating user metrics with new weight:', weight);
      
      const { error } = await supabase
        .from('user_metrics')
        .update({ 
          current_weight: weight,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating user metrics:', error);
        toast.error("Failed to update your metrics");
        return;
      }

      console.log('Successfully updated user metrics');
      toast.success("Your metrics have been updated");
    } catch (err) {
      console.error('Exception while updating metrics:', err);
      toast.error("An error occurred while updating your metrics");
    }
  };

  const handleAddWeight = async (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(newWeight);
    
    if (isNaN(weight)) {
      return;
    }

    const success = await addWeight(weight);
    if (success) {
      // Update user metrics with the new weight
      await updateUserMetrics(weight);
      
      setNewWeight("");
      if (onWeightEntriesChange) {
        onWeightEntriesChange(entries);
      }
    }
  };

  const handleEdit = async (id: string, weight: number) => {
    const success = await editWeight(id, weight);
    if (success) {
      // Update user metrics when weight is edited
      await updateUserMetrics(weight);
      
      if (onWeightEntriesChange) {
        onWeightEntriesChange(entries);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteWeight(id);
    if (success && onWeightEntriesChange) {
      onWeightEntriesChange(entries);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-center">Weight Tracker</h2>
        <p className="text-muted-foreground text-center mb-6">
          Track your progress by recording your weight. We recommend logging your weight 1-2 times per week to see your progress over time.
        </p>
        
        <form onSubmit={handleAddWeight} className="flex gap-4 mb-6">
          <Input
            type="number"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="Enter today's weight (lbs)"
            className="flex-1"
          />
          <Button 
            type="submit"
            className="bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950"
          >
            Log Weight
          </Button>
        </form>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {filterOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={timeFilter === opt.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeFilter(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>

        <WeightChart entries={filteredEntries} />

        {filteredEntries.length > 0 && (
          <WeightTable 
            entries={filteredEntries}
            showMore={showMore}
            onToggleShowMore={() => setShowMore(!showMore)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Card>

      <ProgressPhotos />
    </div>
  );
};

export default WeightTracker;