import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { MealLog } from "@/hooks/useMealLogs";
import EditableTableCell from "./EditableTableCell";
import { toast } from "sonner";

interface MealTableRowProps {
  log: MealLog;
  isEditing: boolean;
  editValues: { meal_name: string; calories: string };
  onEdit: (meal: MealLog) => void;
  onDelete: (id: string) => void;
  onEditStart: (meal: MealLog) => void;
}

const MealTableRow = ({
  log,
  isEditing,
  editValues,
  onEdit,
  onDelete,
  onEditStart,
}: MealTableRowProps) => {
  const handleEditClick = () => {
    if (isEditing) {
      // Save changes
      const newCalories = parseInt(editValues.calories);
      if (!editValues.meal_name.trim()) {
        toast.error("Meal name cannot be empty");
        return;
      }
      if (isNaN(newCalories) || newCalories <= 0) {
        toast.error("Please enter a valid number of calories");
        return;
      }
      
      console.log('Saving edited meal:', {
        ...log,
        meal_name: editValues.meal_name,
        calories: newCalories
      });
      
      onEdit({
        ...log,
        meal_name: editValues.meal_name,
        calories: newCalories
      });
      toast.success("Meal updated successfully");
    } else {
      // Start editing
      onEditStart(log);
    }
  };

  return (
    <TableRow className="bg-background hover:bg-[#0EA5E9]/50 hover:text-white transition-colors">
      <TableCell className="w-1/4">
        <EditableTableCell
          value={isEditing ? editValues.meal_name : log.meal_name}
          isEditing={isEditing}
          onChange={(value) => onEditStart({ ...log, meal_name: value })}
        />
      </TableCell>
      <TableCell className="w-1/6">
        <EditableTableCell
          value={isEditing ? editValues.calories : log.calories.toString()}
          isEditing={isEditing}
          onChange={(value) => onEditStart({ ...log, calories: parseInt(value) || 0 })}
          type="number"
        />
      </TableCell>
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
            onClick={handleEditClick}
            className="hover:bg-[#0EA5E9] hover:text-white"
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
            className="hover:bg-[#0EA5E9] hover:text-white"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default MealTableRow;