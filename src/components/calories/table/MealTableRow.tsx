import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { MealLog } from "@/hooks/useMealLogs";
import EditableTableCell from "./EditableTableCell";
import { toast } from "sonner";
import { useState } from "react";

interface MealTableRowProps {
  log: MealLog;
  onEdit: (meal: MealLog) => void;
  onDelete: (id: string) => void;
}

const MealTableRow = ({
  log,
  onEdit,
  onDelete,
}: MealTableRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    meal_name: log.meal_name,
    calories: log.calories.toString()
  });

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
      setIsEditing(false);
      toast.success("Meal updated successfully");
    } else {
      // Start editing
      setIsEditing(true);
      setEditValues({
        meal_name: log.meal_name,
        calories: log.calories.toString()
      });
    }
  };

  return (
    <TableRow className="bg-background hover:bg-[#0EA5E9]/50 hover:text-white transition-colors">
      <TableCell className="w-1/4">
        <EditableTableCell
          value={editValues.meal_name}
          isEditing={isEditing}
          onChange={(value) => setEditValues({ ...editValues, meal_name: value })}
        />
      </TableCell>
      <TableCell className="w-1/6">
        <EditableTableCell
          value={editValues.calories}
          isEditing={isEditing}
          onChange={(value) => setEditValues({ ...editValues, calories: value })}
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