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

const MealTableRow = ({ log, onEdit, onDelete }: MealTableRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    meal_name: log.meal_name,
    calories: log.calories.toString(),
    protein: (log.protein ?? 0).toString(),
    carbs: (log.carbs ?? 0).toString(),
    sugars: (log.sugars ?? 0).toString(),
    fat: (log.fat ?? 0).toString(),
  });

  const handleEditClick = () => {
    if (isEditing) {
      const newCalories = parseInt(editValues.calories);
      if (!editValues.meal_name.trim()) {
        toast.error("Meal name cannot be empty");
        return;
      }
      if (isNaN(newCalories) || newCalories <= 0) {
        toast.error("Please enter a valid number of calories");
        return;
      }
      onEdit({
        ...log,
        meal_name: editValues.meal_name,
        calories: newCalories,
        protein: parseInt(editValues.protein) || 0,
        carbs: parseInt(editValues.carbs) || 0,
        sugars: parseInt(editValues.sugars) || 0,
        fat: parseInt(editValues.fat) || 0,
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setEditValues({
        meal_name: log.meal_name,
        calories: log.calories.toString(),
        protein: (log.protein ?? 0).toString(),
        carbs: (log.carbs ?? 0).toString(),
        sugars: (log.sugars ?? 0).toString(),
        fat: (log.fat ?? 0).toString(),
      });
    }
  };

  return (
    <TableRow className="bg-background hover:bg-[#0EA5E9]/50 hover:text-white transition-colors text-xs md:text-sm">
      <TableCell className="w-[18%]">
        <EditableTableCell
          value={editValues.meal_name}
          isEditing={isEditing}
          onChange={(value) => setEditValues({ ...editValues, meal_name: value })}
        />
      </TableCell>
      <TableCell className="w-[9%]">
        <EditableTableCell
          value={editValues.calories}
          isEditing={isEditing}
          onChange={(value) => setEditValues({ ...editValues, calories: value })}
          type="number"
        />
      </TableCell>
      <TableCell className="w-[9%]">
        <EditableTableCell
          value={editValues.protein}
          isEditing={isEditing}
          onChange={(value) => setEditValues({ ...editValues, protein: value })}
          type="number"
        />
      </TableCell>
      <TableCell className="w-[9%]">
        <EditableTableCell
          value={editValues.carbs}
          isEditing={isEditing}
          onChange={(value) => setEditValues({ ...editValues, carbs: value })}
          type="number"
        />
      </TableCell>
      <TableCell className="w-[9%]">
        <EditableTableCell
          value={editValues.sugars}
          isEditing={isEditing}
          onChange={(value) => setEditValues({ ...editValues, sugars: value })}
          type="number"
        />
      </TableCell>
      <TableCell className="w-[9%]">
        <EditableTableCell
          value={editValues.fat}
          isEditing={isEditing}
          onChange={(value) => setEditValues({ ...editValues, fat: value })}
          type="number"
        />
      </TableCell>
      <TableCell className="w-[9%]">{format(new Date(log.created_at), "h:mm a")}</TableCell>
      <TableCell className="w-[14%] hidden md:table-cell">{format(new Date(log.created_at), "MMM d, yyyy")}</TableCell>
      <TableCell className="w-[14%] text-right">

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
