import { ACTIVITY_LEVELS, ActivityLevelKey } from './constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActivityLevelSelectorProps {
  selectedActivityKey: ActivityLevelKey | "";
  onActivityChange: (value: ActivityLevelKey) => void;
}

const ActivityLevelSelector = ({
  selectedActivityKey,
  onActivityChange,
}: ActivityLevelSelectorProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Activity Level</label>
      <Select
        value={selectedActivityKey}
        onValueChange={(value) => onActivityChange(value as ActivityLevelKey)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Update your Activity Level" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(ACTIVITY_LEVELS).map(([key, { label }]) => (
            <SelectItem 
              key={key} 
              value={key}
              className="hover:bg-[#0EA5E9]/50 hover:text-white data-[highlighted]:bg-[#0EA5E9]/50 data-[highlighted]:text-white"
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ActivityLevelSelector;