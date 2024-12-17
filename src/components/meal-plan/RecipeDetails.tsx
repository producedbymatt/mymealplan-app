import React from "react";
import { Meal } from "./types";

interface RecipeDetailsProps {
  meal: Meal;
}

const RecipeDetails = ({ meal }: RecipeDetailsProps) => {
  return (
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
  );
};

export default RecipeDetails;