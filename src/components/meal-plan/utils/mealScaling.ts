import { Meal } from "../types";

export const scaleMeal = (originalMeal: Meal, targetCalories: number): Meal => {
  const scaleFactor = targetCalories / originalMeal.calories;
  let totalCalories = 0;
  
  const scaledIngredients = originalMeal.recipe.ingredients.map(ingredient => {
    const parts = ingredient.split(" ");
    const amount = parseFloat(parts[0]);
    if (isNaN(amount)) return ingredient;
    
    const unit = parts[1];
    const calorieMatch = ingredient.match(/\((\d+) cal\)/);
    if (!calorieMatch) return ingredient;
    
    const originalCalories = parseInt(calorieMatch[1]);
    const scaledCalories = Math.round(originalCalories * scaleFactor);
    totalCalories += scaledCalories;
    
    const scaledAmount = amount * scaleFactor;
    const formattedAmount = Math.round(scaledAmount);
    
    const remainingParts = parts.slice(2).join(" ").replace(/\(\d+ cal\)/, `(${scaledCalories} cal)`);
    return `${formattedAmount} ${unit} ${remainingParts}`;
  });

  return {
    ...originalMeal,
    calories: Math.round(totalCalories),
    protein: Math.round(originalMeal.protein * scaleFactor),
    carbs: Math.round(originalMeal.carbs * scaleFactor),
    fat: Math.round(originalMeal.fat * scaleFactor),
    recipe: {
      ...originalMeal.recipe,
      ingredients: scaledIngredients
    }
  };
};