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
  const groupedMeals = mealLogs.reduce((groups: { [key: string]: MealLog[] }, meal) => {
    const date = format(new Date(meal.created_at), "yyyy-MM-dd");
    if (!groups[date]) groups[date] = [];
    groups[date].push(meal);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedMeals).sort((a, b) => b.localeCompare(a));
  const today = format(new Date(), "yyyy-MM-dd");
  const [expandedSections, setExpandedSections] = useState<string[]>([today]);

  return (
    <div className="bg-background rounded-lg shadow">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[22%]">Meal Name</TableHead>
            <TableHead className="w-[10%]">Calories</TableHead>
            <TableHead className="w-[10%]">Protein (g)</TableHead>
            <TableHead className="w-[10%]">Carbs (g)</TableHead>
            <TableHead className="w-[10%]">Sugars (g)</TableHead>
            <TableHead className="w-[10%]">Time</TableHead>
            <TableHead className="w-[14%]">Date</TableHead>
            <TableHead className="w-[14%] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

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
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default MealsTable;
