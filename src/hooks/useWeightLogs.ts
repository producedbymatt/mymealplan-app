import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

export interface WeightEntry {
  date: string;
  weight: number;
  created_at?: string;
}

export const useWeightLogs = (showMore: boolean = false) => {
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const { toast } = useToast();

  const loadWeightLogs = async () => {
    try {
      console.log('Loading weight logs...');
      const { data: weightLogs, error } = await supabase
        .from('weight_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(showMore ? 100 : 8);

      if (error) {
        console.error('Error loading weight logs:', error);
        throw error;
      }

      if (weightLogs) {
        const formattedLogs = weightLogs.map(log => ({
          date: format(new Date(log.created_at), 'MM/dd/yyyy'),
          weight: log.weight,
          created_at: log.created_at
        }));
        console.log('Formatted weight logs:', formattedLogs);
        setEntries(formattedLogs);
        return formattedLogs;
      }
    } catch (error) {
      console.error('Error loading weight logs:', error);
      toast({
        title: "Error",
        description: "Failed to load weight logs",
        variant: "destructive",
      });
    }
    return [];
  };

  const addWeight = async (weight: number) => {
    try {
      const user = supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      console.log('Adding weight log:', { weight });
      const { error } = await supabase
        .from('weight_logs')
        .insert([{ 
          weight,
          user_id: (await user).data.user?.id 
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Weight logged successfully",
      });

      const newEntries = await loadWeightLogs();

      if (newEntries.length > 0) {
        const weightLoss = entries[0]?.weight - weight;
        
        if (weightLoss >= 5) {
          toast({
            title: "Milestone Achieved! 🎉",
            description: `Congratulations! You've lost ${weightLoss.toFixed(1)} lbs!`,
          });
        }
      }

      return true;
    } catch (error) {
      console.error('Error saving weight:', error);
      toast({
        title: "Error",
        description: "Failed to save weight",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    entries,
    loadWeightLogs,
    addWeight
  };
};