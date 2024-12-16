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

interface WeightTableProps {
  entries: WeightEntry[];
  showMore: boolean;
  onToggleShowMore: () => void;
}

const WeightTable = ({ entries, showMore, onToggleShowMore }: WeightTableProps) => {
  return (
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Weight (lbs)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{format(new Date(entry.created_at!), 'MMM dd, yyyy')}</TableCell>
              <TableCell>{format(new Date(entry.created_at!), 'h:mm a')}</TableCell>
              <TableCell className="text-right">{entry.weight}</TableCell>
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