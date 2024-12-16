import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CalorieLogger = () => {
  const [calories, setCalories] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchTodayCalories();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTodayCalories = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('calorie_logs')
      .select('calories')
      .eq('user_id', session?.user?.id)
      .gte('created_at', today);

    if (error) {
      toast.error("Error fetching calories");
      return;
    }

    const total = data?.reduce((sum, entry) => sum + entry.calories, 0) || 0;
    setTotalCalories(total);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast.error("Please log in to track calories");
      return;
    }

    const calorieNum = parseInt(calories);
    if (isNaN(calorieNum)) {
      toast.error("Please enter a valid number");
      return;
    }

    const { error } = await supabase
      .from('calorie_logs')
      .insert([
        { 
          user_id: session.user.id,
          calories: calorieNum,
        }
      ]);

    if (error) {
      toast.error("Error logging calories");
      return;
    }

    toast.success("Calories logged successfully!");
    setCalories("");
    fetchTodayCalories();
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Please log in to access the calorie logger.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Calorie Logger</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Total: {totalCalories} calories</h2>
        
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            type="number"
            placeholder="Enter calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="max-w-[200px]"
          />
          <Button type="submit">Log Calories</Button>
        </form>
      </div>
    </div>
  );
};

export default CalorieLogger;