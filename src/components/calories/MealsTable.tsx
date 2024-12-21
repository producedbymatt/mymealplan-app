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
            <TableHead className="w-1/4">Meal Name</TableHead>
            <TableHead className="w-1/6">Calories</TableHead>
            <TableHead className="w-1/6">Time</TableHead>
            <TableHead className="w-1/4">Date</TableHead>
            <TableHead className="w-1/6 text-right">Actions</TableHead>
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
                <TableCell colSpan={5} className="pb-2 pt-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {format(new Date(date), "EEEE, MMMM do")}
                  </h3>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} className="p-0">
                  <div className="border-2 border-black rounded-lg overflow-hidden">
                    <Table>
                      <TableBody>
                        {groupedMeals[date].map((log) => (
                          <TableRow key={log.id} className="bg-white">
                            <TableCell className="w-1/4">{log.meal_name}</TableCell>
                            <TableCell className="w-1/6">{log.calories}</TableCell>
                            <TableCell className="w-1/6">
                              {format(new Date(log.created_at), "h:mm a")}
                            </TableCell>
                            <TableCell className="w-1/4">
                              {format(new Date(log.created_at), "MMM d, yyyy")}
                            </TableCell>
                            <TableCell className="w-1/6 text-right">
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
                      </TableBody>
                    </Table>
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