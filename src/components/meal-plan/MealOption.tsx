import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Meal } from "./types";

interface MealOptionProps {
  meal: Meal;
}

const MealOption = ({ meal }: MealOptionProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
          <div className="flex-1 text-left">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{meal.name}</h4>
              <Badge variant="secondary">{meal.calories} cal</Badge>
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>Protein: {meal.protein}g</span>
              <span>Carbs: {meal.carbs}g</span>
              <span>Fat: {meal.fat}g</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pt-2">
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2">Preparation Time</h5>
              <p className="text-sm text-gray-600">
                Prep: {meal.recipe.prepTime} | Cook: {meal.recipe.cookTime}
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Ingredients</h5>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {meal.recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Instructions</h5>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                {meal.recipe.instructions.map((instruction, i) => (
                  <li key={i}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MealOption;