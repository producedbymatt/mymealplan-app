import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACTIVITY_LEVELS } from "@/types/calculator";

interface ActivityLevelSelectProps {
  value: number;
  onChange: (value: number) => void;
}

const ActivityLevelSelect = ({ value, onChange }: ActivityLevelSelectProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Activity Level</label>
      <Select
        value={value.toString()}
        onValueChange={(newValue) => onChange(parseFloat(newValue))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select your activity level" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-zinc-950">
          {ACTIVITY_LEVELS.map((level) => (
            <SelectItem key={level.value} value={level.value.toString()}>
              {level.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ActivityLevelSelect;