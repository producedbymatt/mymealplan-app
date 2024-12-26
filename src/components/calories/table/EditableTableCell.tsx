import { Input } from "@/components/ui/input";

interface EditableCellProps {
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  type?: "text" | "number";
  className?: string;
}

const EditableTableCell = ({ value, isEditing, onChange, type = "text", className = "" }: EditableCellProps) => {
  return isEditing ? (
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full ${className}`}
    />
  ) : (
    <span>{value}</span>
  );
};

export default EditableTableCell;