import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface UserMetrics {
  height: number;
  current_weight: number;
  target_weight: number;
  target_days: number;
  recommended_calories: number;
  updated_at: string;
}

const UserStatsDisplay = () => {
  const [metrics, setMetrics] = useState<UserMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestMetrics = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        setLoading(false);
        return;
      }

      console.log('Fetching latest metrics for user:', session.user.id);
      
      const { data, error } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', session.user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching metrics:', error);
        setLoading(false);
        return;
      }

      console.log('Fetched metrics:', data);
      setMetrics(data);
      setLoading(false);
    };

    fetchLatestMetrics();
  }, []);

  const formatHeight = (inches: number) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = Math.round(inches % 12);
    return `${feet}'${remainingInches}"`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-[100px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!metrics) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>
            Start by entering your metrics below to get personalized recommendations.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const stats = [
    {
      title: "Current Weight",
      value: `${metrics.current_weight} lbs`,
      description: `Target: ${metrics.target_weight} lbs`,
    },
    {
      title: "Height",
      value: formatHeight(metrics.height),
      description: "Used for BMI calculation",
    },
    {
      title: "Daily Calories",
      value: `${metrics.recommended_calories}`,
      description: "Recommended intake",
    },
    {
      title: "Goal Timeline",
      value: `${metrics.target_days} days`,
      description: "Until target weight",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStatsDisplay;