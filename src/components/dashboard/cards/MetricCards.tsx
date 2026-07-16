import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatWeight } from "@/lib/utils";
import WeightGoal from "@/components/WeightGoal";


interface MetricCardsProps {
  mostRecentWeight: number;
  heightFeet: number;
  heightInches: number;
  targetWeight: number;
  daysRemaining: number;
  formattedTargetDate: string;
  targetDays: number;
  startingWeight?: number;
  isAuthenticated?: boolean;
}

const MetricCards = ({
  mostRecentWeight,
  heightFeet,
  heightInches,
  targetWeight,
  startingWeight,
  isAuthenticated = true,
}: MetricCardsProps) => {
  const [recommendedCalories, setRecommendedCalories] = useState<number | null>(null);
  const [isRefreshingWeight, setIsRefreshingWeight] = useState(false);
  const [isRefreshingTarget, setIsRefreshingTarget] = useState(false);
  const [isRefreshingProgress, setIsRefreshingProgress] = useState(false);
  const [isRefreshingCalories, setIsRefreshingCalories] = useState(false);
  const [initialWeight, setInitialWeight] = useState<number | null>(null);

  const fetchCalories = async () => {
    if (!isAuthenticated) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      console.log('Fetching calories for user:', user.id);
      const { data, error } = await supabase
        .from('user_metrics')
        .select('recommended_calories')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching calories:', error);
        return;
      }

      if (data) {
        console.log('Fetched recommended calories:', data.recommended_calories);
        setRecommendedCalories(data.recommended_calories);
      }
    } catch (err) {
      console.error('Exception while fetching calories:', err);
    }
  };

  const fetchInitialWeight = async () => {
    if (!isAuthenticated) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get the first weight log entry (oldest)
      const { data, error } = await supabase
        .from('weight_logs')
        .select('weight')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching initial weight:', error);
        return;
      }

      if (data) {
        console.log('Fetched initial weight:', data.weight);
        setInitialWeight(data.weight);
      }
    } catch (err) {
      console.error('Exception while fetching initial weight:', err);
    }
  };

  useEffect(() => {
    fetchCalories();
    fetchInitialWeight();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_metrics'
        },
        async (payload) => {
          console.log('Received real-time update for user_metrics:', payload);
          await fetchCalories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated]);

  const handleRefresh = async (metric: 'weight' | 'target' | 'progress' | 'calories') => {
    const setLoading = {
      'weight': setIsRefreshingWeight,
      'target': setIsRefreshingTarget,
      'progress': setIsRefreshingProgress,
      'calories': setIsRefreshingCalories
    }[metric];

    setLoading(true);
    try {
      switch (metric) {
        case 'calories':
          await fetchCalories();
          toast.success('Calories refreshed');
          break;
        case 'progress':
          await fetchInitialWeight();
          toast.success('Progress refreshed');
          break;
        default:
          toast.success(`${metric} refreshed`);
          break;
      }
    } catch (error) {
      console.error(`Error refreshing ${metric}:`, error);
      toast.error(`Failed to refresh ${metric}`);
    } finally {
      setLoading(false);
    }
  };

  const calculateWeightChange = () => {
    if (!initialWeight || !mostRecentWeight) return 0;
    return mostRecentWeight - initialWeight;
  };

  const weightChange = calculateWeightChange();
  const isWeightLoss = weightChange < 0;

  const formatValue = (value: any, suffix: string = "") => {
    if (!isAuthenticated) return "N/A";
    return value ? `${value}${suffix}` : "Not Set";
  };

  const formatCalories = (calories: number | null) => {
    if (!isAuthenticated) return "N/A";
    if (!calories) return "Not Set";
    return `${Math.round(calories)} cal`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-green-950/90 to-blue-950/90 animate-gradient-x" />
        <CardHeader className="relative z-10 p-0 flex flex-row items-center justify-between">
          <CardTitle className="text-white">Current Weight</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:text-white/80 hover:bg-blue-900 hover:border hover:border-white"
            onClick={() => handleRefresh('weight')}
            disabled={isRefreshingWeight}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshingWeight ? 'animate-spin' : ''}`} />
          </Button>
        </CardHeader>
        <CardContent className="relative z-10 p-0 mt-2">
          <div className="text-2xl font-bold text-white">{isAuthenticated ? `${formatWeight(mostRecentWeight)} lbs` : "N/A"}</div>
          <p className="text-xs text-white/80 mt-1">
            Height: {isAuthenticated ? `${heightFeet}'${heightInches}"` : "N/A"}
          </p>
        </CardContent>
      </Card>

      <Card className="p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-green-950/90 to-blue-950/90 animate-gradient-x" />
        <CardHeader className="relative z-10 p-0 flex flex-row items-center justify-between">
          <CardTitle className="text-white">Target Weight</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:text-white/80 hover:bg-blue-900 hover:border hover:border-white"
            onClick={() => handleRefresh('target')}
            disabled={isRefreshingTarget}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshingTarget ? 'animate-spin' : ''}`} />
          </Button>
        </CardHeader>
        <CardContent className="relative z-10 p-0 mt-2">
          <div className="text-2xl font-bold text-white">
            {isAuthenticated ? `${formatWeight(targetWeight)} lbs` : "N/A"}
          </div>
          <p className="text-xs text-white/80 mt-1">
            {isAuthenticated
              ? targetWeight
                ? `${formatWeight(Math.abs(mostRecentWeight - targetWeight))} lbs to go`
                : "Set a goal to track progress"
              : "Sign in to set goals"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricCards;