import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, List } from "lucide-react";
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
  const [showAllRecipes, setShowAllRecipes] = useState(false);
  const allRecipes = getMealOptionsForTime(time);
  
  const displayedRecipes = showAllRecipes ? allRecipes : options;

  const toggleShowAll = () => {
    setShowAllRecipes(!showAllRecipes);
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
            <List className="h-4 w-4" />
            {showAllRecipes ? "Show Less" : "Show All"}
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
        {displayedRecipes.map((meal, index) => (
          <MealOption 
            key={`${meal.name}-${index}`}
            meal={meal} 
            showFavoritesOnly={showFavoritesOnly}
          />
        ))}
      </div>
      {!isLast && <Separator className="mt-6" />}
    </div>
  );
};

export default MealTimeSlot;