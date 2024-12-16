import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWeightLogs, WeightEntry } from "@/hooks/useWeightLogs";
import WeightChart from "./weight/WeightChart";
import WeightTable from "./weight/WeightTable";

interface WeightTrackerProps {
  onWeightEntriesChange?: (entries: WeightEntry[]) => void;
  showGoalInputs?: boolean;
}

const WeightTracker = ({ onWeightEntriesChange }: WeightTrackerProps) => {
  const [newWeight, setNewWeight] = useState("");
  const [showMore, setShowMore] = useState(false);
  const { entries, loadWeightLogs, addWeight, editWeight, deleteWeight } = useWeightLogs(showMore);

  useEffect(() => {
    loadWeightLogs();
  }, [showMore]);

  const handleAddWeight = async (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(newWeight);
    
    if (isNaN(weight)) {
      return;
    }

    const success = await addWeight(weight);
    if (success) {
      setNewWeight("");
      if (onWeightEntriesChange) {
        onWeightEntriesChange(entries);
      }
    }
  };

  const handleEdit = async (id: string, weight: number) => {
    const success = await editWeight(id, weight);
    if (success && onWeightEntriesChange) {
      onWeightEntriesChange(entries);
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteWeight(id);
    if (success && onWeightEntriesChange) {
      onWeightEntriesChange(entries);
    }
  };

  return (
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
        <Button type="submit">Log Weight</Button>
      </form>

      <WeightChart entries={entries} />

      {entries.length > 0 && (
        <WeightTable 
          entries={entries}
          showMore={showMore}
          onToggleShowMore={() => setShowMore(!showMore)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Card>
  );
};

export default WeightTracker;