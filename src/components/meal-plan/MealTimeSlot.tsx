import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronDown, ChevronUp, List } from "lucide-react";
import MealOption from "./MealOption";
import { Separator } from "@/components/ui/separator";
import { Meal } from "./types";
import { getMealOptionsForTime } from "./mealData";

interface MealTimeSlotProps {
  time: string;
  options: Meal[];
  onRefresh: () => void;
  isLast?: boolean;
  showFavoritesOnly?: boolean;
}

const MealTimeSlot = ({ time, options, onRefresh, isLast, showFavoritesOnly }: MealTimeSlotProps) => {
  const [showAll, setShowAll] = useState(false);
  const allMealOptions = getMealOptionsForTime(time);
  const displayedOptions = showAll ? allMealOptions : options;
  
  const toggleShowAll = () => {
    setShowAll(!showAll);
    console.log(`Toggling show all for ${time}: ${!showAll}`);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">{time}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleShowAll}
            className="flex items-center gap-2"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show All
              </>
            )}
          </Button>
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
      {showAll && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <List className="h-4 w-4" />
          <span>Total Recipes: {allMealOptions.length}</span>
        </div>
      )}
      {!isLast && <Separator className="mt-6" />}
    </div>
  );
};

export default MealTimeSlot;