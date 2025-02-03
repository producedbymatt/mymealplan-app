import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
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
  onFavoriteChange?: (meal: Meal, isFavorite: boolean) => void;
}

const MealTimeSlot = ({ 
  time, 
  options, 
  onRefresh, 
  isLast, 
  showFavoritesOnly,
  onFavoriteChange 
}: MealTimeSlotProps) => {
  const [showAll, setShowAll] = useState(false);
  const [allOptions, setAllOptions] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadAllOptions = async () => {
      if (showAll) {
        setIsLoading(true);
        try {
          const meals = await getMealOptionsForTime(time);
          // Include the current options (which include favorites) in the expanded list
          const uniqueMeals = [...options];
          
          // Add new meals that aren't already in the list
          meals.forEach(meal => {
            if (!uniqueMeals.some(existing => existing.name === meal.name)) {
              uniqueMeals.push(meal);
            }
          });
          
          setAllOptions(uniqueMeals);
        } catch (error) {
          console.error('Error loading meal options:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadAllOptions();
  }, [time, showAll, options]);

  const displayedOptions = showAll ? allOptions : options;
  const hasVisibleOptions = displayedOptions.some(meal => !showFavoritesOnly || meal.isFavorite);

  if (showFavoritesOnly && !hasVisibleOptions) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">{time}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="flex items-center gap-2 hover:text-white hover:bg-blue-900 hover:border hover:border-white"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Options
        </Button>
      </div>
      <div className="grid gap-4">
        {displayedOptions.map((meal, index) => (
          <MealOption 
            key={`${meal.name}-${index}`}
            meal={meal} 
            showFavoritesOnly={showFavoritesOnly}
            onFavoriteChange={onFavoriteChange}
          />
        ))}
      </div>
      <div className="mt-4">
        <Button
          variant="ghost"
          className="w-full flex items-center gap-2 text-muted-foreground hover:text-white hover:bg-blue-900 hover:border hover:border-white"
          onClick={() => setShowAll(!showAll)}
          disabled={isLoading}
        >
          {showAll ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show All Options
            </>
          )}
        </Button>
      </div>
      {!isLast && <Separator className="mt-6" />}
    </div>
  );
};

export default MealTimeSlot;