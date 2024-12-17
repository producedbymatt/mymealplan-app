import React from "react";
import { Meal } from "./types";
import MealOption from "./MealOption";
import { Separator } from "@/components/ui/separator";

interface FavoritesListProps {
  meals: Meal[];
  time: string;
  isLast: boolean;
}

const FavoritesList = ({ meals, time, isLast }: FavoritesListProps) => {
  if (meals.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">{time}</h3>
      </div>
      <div className="grid gap-4">
        {meals.map((meal, index) => (
          <MealOption 
            key={`${meal.name}-${index}`}
            meal={meal}
            showFavoritesOnly={true}
          />
        ))}
      </div>
      {!isLast && <Separator className="mt-6" />}
    </div>
  );
};

export default FavoritesList;