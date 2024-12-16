import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, startOfWeek, isWithinInterval, subWeeks } from "date-fns";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

interface MealLog {
  id: string;
  user_id: string;
  meal_name: string;
  calories: number;
  created_at: string;
}

const CalorieLogger = () => {
  const [session, setSession] = useState<any>(null);
  const [newMeal, setNewMeal] = useState({ meal_name: "", calories: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<MealLog | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: mealLogs = [], isLoading } = useQuery({
    queryKey: ['meal-logs'],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      const oneWeekAgo = subWeeks(new Date(), 1).toISOString();
      const { data, error } = await supabase
        .from('meal_logs')
        .select('*')
        .eq('user_id', session.user.id)
        .gte('created_at', oneWeekAgo)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as MealLog[];
    },
    enabled: !!session?.user?.id,
  });

  const addMealMutation = useMutation({
    mutationFn: async (meal: { meal_name: string; calories: number }) => {
      const { data, error } = await supabase
        .from('meal_logs')
        .insert([
          {
            user_id: session?.user?.id,
            meal_name: meal.meal_name,
            calories: meal.calories,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-logs'] });
      toast.success("Meal logged successfully!");
      setNewMeal({ meal_name: "", calories: "" });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to log meal: " + error.message);
    },
  });

  const updateMealMutation = useMutation({
    mutationFn: async (meal: MealLog) => {
      const { data, error } = await supabase
        .from('meal_logs')
        .update({
          meal_name: meal.meal_name,
          calories: meal.calories,
        })
        .eq('id', meal.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-logs'] });
      toast.success("Meal updated successfully!");
      setEditingMeal(null);
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to update meal: " + error.message);
    },
  });

  const deleteMealMutation = useMutation({
    mutationFn: async (mealId: string) => {
      const { error } = await supabase
        .from('meal_logs')
        .delete()
        .eq('id', mealId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-logs'] });
      toast.success("Meal deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete meal: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeal.meal_name || !newMeal.calories) {
      toast.error("Please fill in all fields");
      return;
    }

    if (editingMeal) {
      updateMealMutation.mutate({
        ...editingMeal,
        meal_name: newMeal.meal_name,
        calories: parseInt(newMeal.calories),
      });
    } else {
      addMealMutation.mutate({
        meal_name: newMeal.meal_name,
        calories: parseInt(newMeal.calories),
      });
    }
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
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Please log in to access the calorie logger.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Today's Total Calories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{todayCalories}</p>
          </CardContent>
        </Card>
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Meal name"
                  value={newMeal.meal_name}
                  onChange={(e) => setNewMeal({ ...newMeal, meal_name: e.target.value })}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Calories"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">
                {editingMeal ? "Update Meal" : "Add Meal"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meal Name</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mealLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.meal_name}</TableCell>
                <TableCell>{log.calories}</TableCell>
                <TableCell>{format(new Date(log.created_at), "h:mm a")}</TableCell>
                <TableCell>{format(new Date(log.created_at), "MMM d, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingMeal(log);
                        setNewMeal({
                          meal_name: log.meal_name,
                          calories: log.calories.toString(),
                        });
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this meal?")) {
                          deleteMealMutation.mutate(log.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CalorieLogger;