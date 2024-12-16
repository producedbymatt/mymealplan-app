import { format } from "date-fns";
import { WeightEntry } from "@/hooks/useWeightLogs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface WeightTableProps {
  entries: WeightEntry[];
  showMore: boolean;
  onToggleShowMore: () => void;
  onEdit?: (id: string, weight: number) => void;
  onDelete?: (id: string) => void;
}

const WeightTable = ({ entries, showMore, onToggleShowMore, onEdit, onDelete }: WeightTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editWeight, setEditWeight] = useState<string>("");

  const handleEdit = (entry: WeightEntry) => {
    if (!entry.id) return;
    
    if (editingId === entry.id) {
      const newWeight = parseFloat(editWeight);
      if (!isNaN(newWeight) && onEdit) {
        onEdit(entry.id, newWeight);
        setEditingId(null);
        setEditWeight("");
      }
    } else {
      setEditingId(entry.id);
      setEditWeight(entry.weight.toString());
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this weight entry?")) {
      onDelete?.(id);
    }
  };

  return (
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Weight (lbs)</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{format(new Date(entry.created_at!), 'MMM dd, yyyy')}</TableCell>
              <TableCell>{format(new Date(entry.created_at!), 'h:mm a')}</TableCell>
              <TableCell>
                {editingId === entry.id ? (
                  <Input
                    type="number"
                    value={editWeight}
                    onChange={(e) => setEditWeight(e.target.value)}
                    className="w-24"
                  />
                ) : (
                  entry.weight
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(entry)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(entry.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {entries.length > 8 && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={onToggleShowMore}
          >
            {showMore ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WeightTable;