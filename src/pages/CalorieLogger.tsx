import React, { useState, useEffect } from "react";
import { MealForm } from "@/components/MealForm";
import MealsTable from "@/components/calories/MealsTable";
import CaloriesSummaryCard from "@/components/calories/CaloriesSummaryCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useMealLogs } from "@/hooks/useMealLogs";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const CalorieLogger = () => {
  const [editingMeal, setEditingMeal] = useState<any>(null);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [recommendedCalories, setRecommendedCalories] = useState<number>(0);
  const { mealLogs, addMeal, updateMeal, deleteMeal } = useMealLogs(userId);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id);

      if (session?.user?.id) {
        // Fetch user metrics to get recommended calories
        const { data, error } = await supabase
          .from('user_metrics')
          .select('recommended_calories')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching recommended calories:', error);
          return;
        }

        if (data) {
          console.log('Fetched recommended calories:', data.recommended_calories);
          setRecommendedCalories(data.recommended_calories);
        }
      }
    };
    
    getSession();
  }, []);

  const handleSubmit = async (meal: { meal_name: string; calories: number }) => {
    try {
      if (editingMeal) {
        console.log('Updating meal:', { ...editingMeal, ...meal });
        await updateMeal({
          ...editingMeal,
          meal_name: meal.meal_name,
          calories: meal.calories
        });
        setEditingMeal(null);
        toast.success("Meal updated successfully");
      } else {
        await addMeal(meal);
        toast.success("Meal added successfully");
      }
    } catch (error) {
      console.error('Error saving meal:', error);
      toast.error("Failed to save meal");
    }
  };

  const handleEdit = (meal: any) => {
    console.log('Editing meal:', meal);
    setEditingMeal(meal);
  };

  const handleCancel = () => {
    console.log('Canceling edit');
    setEditingMeal(null);
  };

  const todayCalories = mealLogs
    .filter((log) => {
      const today = new Date();
      const logDate = new Date(log.created_at);
      return (
        logDate.getDate() === today.getDate() &&
        logDate.getMonth() === today.getMonth() &&
        logDate.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, log) => sum + log.calories, 0);

  return (
    <div className="min-h-screen bg-background py-8 flex flex-col">
      <div className="container mx-auto px-4 flex-grow">
        <Header />
        <h1 className="text-3xl font-bold text-center mb-8">Calorie Logger</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <MealForm 
              onSubmit={handleSubmit}
              initialMeal={editingMeal}
              onCancel={handleCancel}
              submitButtonText={editingMeal ? "Update Meal" : "Add Meal"}
            />
          </div>
          <div>
            <CaloriesSummaryCard
              todayCalories={todayCalories}
              recommendedCalories={recommendedCalories}
            />
          </div>
        </div>
        <div className="mt-8">
          <MealsTable
            mealLogs={mealLogs}
            onEdit={handleEdit}
            onDelete={deleteMeal}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalorieLogger;