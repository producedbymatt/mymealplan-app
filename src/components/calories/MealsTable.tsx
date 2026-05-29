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
    <div className="bg-background rounded-lg shadow overflow-x-auto">
      <div className="min-w-[720px]">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[18%] text-xs md:text-sm">
                <span className="hidden md:inline">Meal Name</span>
                <span className="md:hidden">Meal</span>
              </TableHead>
              <TableHead className="w-[9%] text-xs md:text-sm">
                <span className="hidden md:inline">Calories</span>
                <span className="md:hidden">Cal</span>
              </TableHead>
              <TableHead className="w-[9%] text-xs md:text-sm">
                <span className="hidden md:inline">Protein (g)</span>
                <span className="md:hidden">Protein</span>
              </TableHead>
              <TableHead className="w-[9%] text-xs md:text-sm">
                <span className="hidden md:inline">Carbs (g)</span>
                <span className="md:hidden">Carbs</span>
              </TableHead>
              <TableHead className="w-[9%] text-xs md:text-sm">
                <span className="hidden md:inline">Sugars (g)</span>
                <span className="md:hidden">Sugar</span>
              </TableHead>
              <TableHead className="w-[9%] text-xs md:text-sm">
                <span className="hidden md:inline">Fat (g)</span>
                <span className="md:hidden">Fat</span>
              </TableHead>
              <TableHead className="w-[9%] text-xs md:text-sm">Time</TableHead>
              <TableHead className="w-[14%] text-xs md:text-sm hidden md:table-cell">Date</TableHead>
              <TableHead className="w-[14%] text-right text-xs md:text-sm"></TableHead>
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
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Accordion>
      </div>
    </div>
  );
};

export default MealsTable;
