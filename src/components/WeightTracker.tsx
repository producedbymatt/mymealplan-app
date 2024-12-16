import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface WeightEntry {
  date: string;
  weight: number;
  created_at?: string;
}

interface WeightTrackerProps {
  onWeightEntriesChange?: (entries: WeightEntry[]) => void;
  showGoalInputs?: boolean;
}

const WeightTracker = ({ onWeightEntriesChange }: WeightTrackerProps) => {
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [newWeight, setNewWeight] = useState("");
  const [displayedEntries, setDisplayedEntries] = useState<WeightEntry[]>([]);
  const [showMore, setShowMore] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    loadWeightLogs();
  }, []);

  const loadWeightLogs = async () => {
    try {
      const { data: weightLogs, error } = await supabase
        .from('weight_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(showMore ? 100 : 8);

      if (error) throw error;

      if (weightLogs) {
        const formattedLogs = weightLogs.map(log => ({
          date: format(new Date(log.created_at), 'MM/dd/yyyy'),
          weight: log.weight,
          created_at: log.created_at
        }));
        setEntries(formattedLogs);
        setDisplayedEntries(formattedLogs);
      }
    } catch (error) {
      console.error('Error loading weight logs:', error);
      toast({
        title: "Error",
        description: "Failed to load weight logs",
        variant: "destructive",
      });
    }
  };

  const addWeight = async (e: React.FormEvent) => {
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

    try {
      const { error } = await supabase
        .from('weight_logs')
        .insert([{ weight }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Weight logged successfully",
      });

      setNewWeight("");
      loadWeightLogs();

      if (entries.length > 0) {
        const weightLoss = entries[0].weight - weight;
        
        if (weightLoss >= 5) {
          toast({
            title: "Milestone Achieved! 🎉",
            description: `Congratulations! You've lost ${weightLoss.toFixed(1)} lbs!`,
          });
        }
      }

      if (onWeightEntriesChange) {
        onWeightEntriesChange(entries);
      }
    } catch (error) {
      console.error('Error saving weight:', error);
      toast({
        title: "Error",
        description: "Failed to save weight",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">Weight Tracker</h2>
      <p className="text-muted-foreground text-center mb-6">
        Track your progress by recording your weight. We recommend logging your weight 1-2 times per week to see your progress over time.
      </p>
      <form onSubmit={addWeight} className="flex gap-4 mb-6">
        <Input
          type="number"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
          placeholder="Enter today's weight (lbs)"
          className="flex-1"
        />
        <Button type="submit">Log Weight</Button>
      </form>

      <div className="h-[300px] w-full mb-6">
        {entries.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={entries}>
              <XAxis dataKey="date" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#63B3ED"
                strokeWidth={2}
                dot={{ fill: "#63B3ED" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Log your weight to see your progress chart
          </div>
        )}
      </div>

      {entries.length > 0 && (
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Weight (lbs)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedEntries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{format(new Date(entry.created_at!), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{format(new Date(entry.created_at!), 'h:mm a')}</TableCell>
                  <TableCell className="text-right">{entry.weight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {entries.length > 8 && (
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                onClick={() => {
                  setShowMore(!showMore);
                  loadWeightLogs();
                }}
              >
                {showMore ? "Show Less" : "Show More"}
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default WeightTracker;