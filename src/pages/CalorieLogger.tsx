import React, { useState, useEffect } from "react";
import { MealForm } from "@/components/MealForm";
import MealsTable from "@/components/calories/MealsTable";
import CaloriesSummaryCard from "@/components/calories/CaloriesSummaryCard";
import ProteinSummaryCard from "@/components/calories/ProteinSummaryCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useMealLogs } from "@/hooks/useMealLogs";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const CalorieLogger = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [recommendedCalories, setRecommendedCalories] = useState<number>(0);
  const [proteinGoal, setProteinGoal] = useState<number | null>(null);
  const { mealLogs, addMeal, updateMeal, deleteMeal } = useMealLogs(userId);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id);

      if (session?.user?.id) {
        const { data, error } = await supabase
          .from('user_metrics')
          .select('recommended_calories, protein_goal, current_weight')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching user metrics:', error);
          return;
        }

        if (data) {
          setRecommendedCalories(data.recommended_calories ?? 0);
          // Use explicit protein_goal if set, otherwise default to 0.8g per kg of body weight
          const goal =
            (data as any).protein_goal ??
            (data.current_weight ? Math.round(data.current_weight * 0.8) : null);
          setProteinGoal(goal);
        }
      }
    };

    getSession();
  }, []);

  const handleSubmit = async (meal: { meal_name: string; calories: number; protein: number; carbs: number; sugars: number }) => {
    try {
      await addMeal(meal);
      toast.success("Meal added successfully");
    } catch (error) {
      console.error('Error saving meal:', error);
      toast.error("Failed to save meal");
    }
  };

  const isToday = (dateStr: string) => {
    const today = new Date();
    const d = new Date(dateStr);
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const todayLogs = mealLogs.filter((log) => isToday(log.created_at));
  const todayCalories = todayLogs.reduce((sum, log) => sum + log.calories, 0);
  const todayProtein = todayLogs.reduce((sum, log) => sum + (log.protein ?? 0), 0);

  return (
    <div className="min-h-screen bg-background py-8 flex flex-col">
      <div className="container mx-auto px-4 flex-grow">
        <Header />
        <h1 className="text-3xl font-bold text-center mb-8">Calorie Logger</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <MealForm
              onSubmit={handleSubmit}
              submitButtonText="Add Meal"
            />
          </div>
          <div className="grid gap-4">
            <CaloriesSummaryCard
              todayCalories={todayCalories}
              recommendedCalories={recommendedCalories}
            />
            <ProteinSummaryCard
              todayProtein={todayProtein}
              proteinGoal={proteinGoal}
            />
          </div>
        </div>
        <div className="mt-8">
          <MealsTable
            mealLogs={mealLogs}
            onEdit={updateMeal}
            onDelete={deleteMeal}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalorieLogger;
