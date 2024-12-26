import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { MealLog } from "@/hooks/useMealLogs";
import MealTableRow from "./MealTableRow";

interface DailyMealGroupProps {
  date: string;
  meals: MealLog[];
  isToday: boolean;
  dateIndex: number;
  editingId: string | null;
  editValues: { meal_name: string; calories: string };
  onEdit: (meal: MealLog) => void;
  onDelete: (id: string) => void;
  onEditStart: (meal: MealLog) => void;
}

const DailyMealGroup = ({
  date,
  meals,
  isToday,
  dateIndex,
  onEdit,
  onDelete,
}: DailyMealGroupProps) => {
  const getDailyTotal = (meals: MealLog[]) => {
    return meals.reduce((total, meal) => total + meal.calories, 0);
  };

  return (
    <AccordionItem key={date} value={date}>
      {dateIndex > 0 && <Separator className="my-2" />}
      <div className="w-full bg-gradient-to-r from-blue-950/90 to-green-950/90 text-white rounded-lg">
        <AccordionTrigger className="w-full px-4 py-4 [&[data-state=open]>div>svg]:rotate-180 [&>svg]:hidden">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-lg font-semibold">
              {format(new Date(date), "EEEE, MMMM do")}
              {isToday && " (Today)"}
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">
                Total: {getDailyTotal(meals)} calories
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </div>
          </div>
        </AccordionTrigger>
      </div>
      
      <AccordionContent className="px-4 pt-2">
        <div className="rounded-lg overflow-hidden mt-2">
          <Table>
            <TableBody>
              {meals.map((log) => (
                <MealTableRow
                  key={log.id}
                  log={log}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default DailyMealGroup;