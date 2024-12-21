import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import MealOption from "./MealOption";
import { Separator } from "@/components/ui/separator";
import { Meal } from "./types";

interface MealTimeSlotProps {
  time: string;
  options: Meal[];
  onRefresh: () => void;
  isLast?: boolean;
  showFavoritesOnly?: boolean;
}

const MealTimeSlot = ({ time, options, onRefresh, isLast, showFavoritesOnly }: MealTimeSlotProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedOptions = showAll ? options : options.slice(0, 3);

  console.log(`MealTimeSlot ${time}: Showing ${displayedOptions.length} of ${options.length} options`);

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
        {displayedOptions.map((meal, index) => (
          <MealOption 
            key={`${meal.name}-${index}`}
            meal={meal} 
            showFavoritesOnly={showFavoritesOnly}
          />
        ))}
      </div>
      
      <div className="mt-6 flex flex-col items-center gap-2 border-t pt-4">
        <Button
          variant="secondary"
          size="default"
          onClick={() => setShowAll(!showAll)}
          className="w-full max-w-[200px] flex items-center justify-center gap-2"
        >
          {showAll ? (
            <>
              Show Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show All <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
        <p className="text-sm text-muted-foreground">
          Total recipes in {time}: {options.length}
        </p>
      </div>
      
      {!isLast && <Separator className="mt-6" />}
    </div>
  );
};

export default MealTimeSlot;