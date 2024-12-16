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
import { MealLog } from "@/hooks/useMealLogs";

interface MealsTableProps {
  mealLogs: MealLog[];
  onEdit: (meal: MealLog) => void;
  onDelete: (id: string) => void;
}

const MealsTable = ({ mealLogs, onEdit, onDelete }: MealsTableProps) => {
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
  );
};

export default MealsTable;