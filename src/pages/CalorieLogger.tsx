import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { MealForm } from "@/components/MealForm";
import { useMealLogs, MealLog } from "@/hooks/useMealLogs";

const CalorieLogger = () => {
  const [session, setSession] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<MealLog | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
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
                          deleteMeal(log.id);
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