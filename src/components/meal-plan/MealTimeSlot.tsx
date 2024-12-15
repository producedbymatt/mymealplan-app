import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import MealOption from "./MealOption";
import { Separator } from "@/components/ui/separator";
import { Meal } from "./types";

interface MealTimeSlotProps {
  time: string;
  options: Meal[];
  onRefresh: () => void;
  isLast?: boolean;
}

const MealTimeSlot = ({ time, options, onRefresh, isLast }: MealTimeSlotProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">{time}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Options
        </Button>
      </div>
      <div className="grid gap-4">
        {options.map((meal, index) => (
          <MealOption key={index} meal={meal} />
        ))}
      </div>
      {!isLast && <Separator className="mt-6" />}
    </div>
  );
};

export default MealTimeSlot;