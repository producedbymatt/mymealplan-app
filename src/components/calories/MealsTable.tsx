import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
} from "@/components/ui/accordion";
import { MealLog } from "@/hooks/useMealLogs";
import DailyMealGroup from "./table/DailyMealGroup";

interface MealsTableProps {
  mealLogs: MealLog[];
  onEdit: (meal: MealLog) => void;
  onDelete: (id: string) => void;
}

const MealsTable = ({ mealLogs, onEdit, onDelete }: MealsTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ meal_name: string; calories: string }>({
    meal_name: "",
    calories: ""
  });

  // Group meals by date
  const groupedMeals = mealLogs.reduce((groups: { [key: string]: MealLog[] }, meal) => {
    const date = format(new Date(meal.created_at), "yyyy-MM-dd");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(meal);
    return groups;
  }, {});

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedMeals).sort((a, b) => b.localeCompare(a));

  // Find today's date in yyyy-MM-dd format
  const today = format(new Date(), "yyyy-MM-dd");
  
  // State to track expanded sections
  const [expandedSections, setExpandedSections] = useState<string[]>([today]);

  const handleEditStart = (meal: MealLog) => {
    setEditingId(meal.id);
    setEditValues({
      meal_name: meal.meal_name,
      calories: meal.calories.toString()
    });
  };

  const handleEdit = (meal: MealLog) => {
    onEdit(meal);
    setEditingId(null);
    setEditValues({ meal_name: "", calories: "" });
  };

  return (
    <div className="bg-background rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-1/4">Meal Name</TableHead>
            <TableHead className="w-1/6">Calories</TableHead>
            <TableHead className="w-1/6">Time</TableHead>
            <TableHead className="w-1/4">Date</TableHead>
            <TableHead className="w-1/6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      
      <Accordion 
        type="multiple" 
        value={expandedSections}
        onValueChange={setExpandedSections}
      >
        {sortedDates.map((date, dateIndex) => (
          <DailyMealGroup
            key={date}
            date={date}
            meals={groupedMeals[date]}
            isToday={date === today}
            dateIndex={dateIndex}
            editingId={editingId}
            editValues={editValues}
            onEdit={handleEdit}
            onDelete={onDelete}
            onEditStart={handleEditStart}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default MealsTable;