import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MealForm } from "@/components/MealForm";
import { useMealLogs, MealLog } from "@/hooks/useMealLogs";
import CaloriesSummaryCard from "@/components/calories/CaloriesSummaryCard";
import MealsTable from "@/components/calories/MealsTable";
import Footer from "@/components/Footer";

const CalorieLogger = () => {
  const [session, setSession] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<MealLog | null>(null);
  const [recommendedCalories, setRecommendedCalories] = useState<number | null>(null);

  const fetchRecommendedCalories = async (userId: string) => {
    try {
      console.log('Fetching recommended calories for user:', userId);
      const { data, error } = await supabase
        .from('user_metrics')
        .select('recommended_calories')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
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
    } catch (err) {
      console.error('Error fetching recommended calories:', err);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchRecommendedCalories(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchRecommendedCalories(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const { mealLogs, isLoading, addMeal, updateMeal, deleteMeal } = useMealLogs(session?.user?.id);

  const handleSubmit = (meal: { meal_name: string; calories: number }) => {
    if (editingMeal) {
      updateMeal({ ...editingMeal, ...meal });
    } else {
      addMeal(meal);
    }
    setIsDialogOpen(false);
    setEditingMeal(null);
  };

  const todayCalories = mealLogs
    .filter(log => {
      const logDate = new Date(log.created_at);
      const today = new Date();
      return (
        logDate.getDate() === today.getDate() &&
        logDate.getMonth() === today.getMonth() &&
        logDate.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, log) => sum + log.calories, 0);

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex justify-center items-center flex-grow">
          <p className="text-lg">Please log in to access the calorie logger.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <CaloriesSummaryCard 
            todayCalories={todayCalories} 
            recommendedCalories={recommendedCalories} 
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Meal Logs</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Meal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingMeal ? "Edit Meal" : "Add New Meal"}</DialogTitle>
              </DialogHeader>
              <MealForm
                onSubmit={handleSubmit}
                initialMeal={editingMeal}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingMeal(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <MealsTable 
          mealLogs={mealLogs}
          onEdit={(meal) => {
            setEditingMeal(meal);
            setIsDialogOpen(true);
          }}
          onDelete={deleteMeal}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CalorieLogger;
