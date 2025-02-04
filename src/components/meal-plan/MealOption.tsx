import React from "react";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Meal } from "./types";
import { useFavoriteMeal } from "@/hooks/useFavoriteMeal";
import RecipeDetails from "./RecipeDetails";

interface MealOptionProps {
  meal: Meal;
  showFavoritesOnly?: boolean;
  onFavoriteChange?: (meal: Meal, isFavorite: boolean) => void;
}

const MealOption = ({ meal, showFavoritesOnly, onFavoriteChange }: MealOptionProps) => {
  const { isFavorite, isLoading, toggleFavorite: toggleFavoriteState } = useFavoriteMeal(meal);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteState = await toggleFavoriteState(e);
    if (onFavoriteChange) {
      onFavoriteChange(meal, newFavoriteState);
    }
  };

  // If showFavoritesOnly is true and this meal is not a favorite, don't render it
  if (showFavoritesOnly && !isFavorite) {
    return null;
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="p-4 bg-gradient-to-r from-blue-950/90 to-green-950/90 rounded-lg hover:bg-gradient-to-r hover:from-blue-900/90 hover:to-green-900/90 transition-colors text-white">
          <div className="flex-1 text-left">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium break-words">{meal.name}</h4>
                  <Heart
                    className={`h-5 w-5 cursor-pointer transition-colors flex-shrink-0 ${
                      isLoading ? "opacity-50" : ""
                    } ${
                      isFavorite
                        ? "fill-red-500 stroke-red-500"
                        : "stroke-gray-200 hover:stroke-red-500"
                    }`}
                    onClick={toggleFavorite}
                  />
                </div>
              </div>
              <Badge variant="secondary" className="whitespace-nowrap flex-shrink-0 bg-white/10 text-white hover:bg-white/20">
                {meal.calories} cal
              </Badge>
            </div>
            <div className="flex gap-4 text-sm text-gray-200">
              <span>Protein: {meal.protein}g</span>
              <span>Carbs: {meal.carbs}g</span>
              <span>Fat: {meal.fat}g</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pt-2 text-white bg-gradient-to-r from-blue-950/90 to-green-950/90 rounded-b-lg">
          <RecipeDetails meal={meal} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MealOption;