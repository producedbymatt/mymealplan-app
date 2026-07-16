import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import WeightProgressSummary from "@/components/weight/WeightProgressSummary";
import CaloriesSummaryCard from "@/components/calories/CaloriesSummaryCard";
import ProteinSummaryCard from "@/components/calories/ProteinSummaryCard";
import { useWeightLogs } from "@/hooks/useWeightLogs";
import { useMealLogs } from "@/hooks/useMealLogs";
import { calculateProteinNeeds } from "@/components/calories/utils";
import { ACTIVITY_LEVELS, ActivityLevelKey } from "@/components/calories/constants";
import { Scale } from "lucide-react";

const isToday = (dateStr: string) => {
  const today = new Date();
  const d = new Date(dateStr);
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

const DashboardSummaries = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [recommendedCalories, setRecommendedCalories] = useState<number>(0);
  const [proteinGoal, setProteinGoal] = useState<number | null>(null);
  const { entries, loadWeightLogs } = useWeightLogs();
  const { mealLogs } = useMealLogs(userId);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const uid = session?.user?.id;
      setUserId(uid);
      if (!uid) return;

      await loadWeightLogs();

      const { data } = await supabase
        .from('user_metrics')
        .select('recommended_calories, activity_level, target_weight, current_weight')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setRecommendedCalories(data.recommended_calories ?? 0);
        const weight = data.target_weight ?? data.current_weight;
        const activityKey = (data.activity_level ?? 'sedentary') as ActivityLevelKey;
        const activityValue = ACTIVITY_LEVELS[activityKey]?.value ?? 1.2;
        if (weight) {
          const { minProtein } = calculateProteinNeeds(weight, activityValue);
          setProteinGoal(minProtein);
        }
      }
    };
    init();
  }, []);

  const todayLogs = mealLogs.filter((log) => isToday(log.created_at));
  const todayCalories = todayLogs.reduce((sum, log) => sum + log.calories, 0);
  const todayProtein = todayLogs.reduce((sum, log) => sum + (log.protein ?? 0), 0);

  return (
    <div className="space-y-6">
      <WeightProgressSummary entries={entries} label="All Time" />


      <div>
        <div className="grid gap-4 md:grid-cols-2">
          <CaloriesSummaryCard
            todayCalories={todayCalories}
            recommendedCalories={recommendedCalories || null}
          />
          <ProteinSummaryCard
            todayProtein={todayProtein}
            proteinGoal={proteinGoal}
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button asChild variant="secondary">
            <Link to="/calorie-logger">
              <UtensilsCrossed className="mr-2 h-4 w-4" />
              Log Meal
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummaries;
