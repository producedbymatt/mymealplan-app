import React from "react";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { MealLog } from "@/hooks/useMealLogs";

interface MealsTableProps {
  mealLogs: MealLog[];
  onEdit: (meal: MealLog) => void;
  onDelete: (id: string) => void;
}

const MealsTable = ({ mealLogs, onEdit, onDelete }: MealsTableProps) => {
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

  return (
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
          {sortedDates.map((date, dateIndex) => (
            <React.Fragment key={date}>
              {dateIndex > 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="p-0">
                    <Separator className="my-2" />
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={5} className="p-0">
                  <div className="border-2 border-black rounded-lg overflow-hidden">
                    {groupedMeals[date].map((log) => (
                      <TableRow 
                        key={log.id}
                        className={dateIndex % 2 === 0 ? "bg-white" : "bg-blue-100/50"}
                      >
                        <TableCell>{log.meal_name}</TableCell>
                        <TableCell>{log.calories}</TableCell>
                        <TableCell>{format(new Date(log.created_at), "h:mm a")}</TableCell>
                        <TableCell>{format(new Date(log.created_at), "MMM d, yyyy")}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onEdit(log)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                if (window.confirm("Are you sure you want to delete this meal?")) {
                                  onDelete(log.id);
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MealsTable;