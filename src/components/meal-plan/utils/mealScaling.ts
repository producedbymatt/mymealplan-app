import { Meal } from "../types";

export const scaleMeal = (originalMeal: Meal, targetCalories: number): Meal => {
  const scaleFactor = targetCalories / originalMeal.calories;
  let totalCalories = 0;
  
  // Scale ingredients and track quantities
  const quantityMap = new Map<string, { original: number; scaled: number }>();
  
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
    
    const scaledAmount = Math.round(amount * scaleFactor);
    
    // Store the original and scaled amounts for use in instructions
    quantityMap.set(`${amount} ${unit}`, {
      original: amount,
      scaled: scaledAmount
    });
    
    const remainingParts = parts.slice(2).join(" ").replace(/\(\d+ cal\)/, `(${scaledCalories} cal)`);
    return `${scaledAmount} ${unit} ${remainingParts}`;
  });

  // Scale instructions
  const scaledInstructions = originalMeal.recipe.instructions.map(instruction => {
    let scaledInstruction = instruction;
    
    // Look for quantity patterns (e.g., "1 cup", "2 tablespoons")
    quantityMap.forEach(({ original, scaled }, originalQty) => {
      const regex = new RegExp(`\\b${originalQty}\\b`, 'g');
      if (regex.test(instruction)) {
        const [amount, unit] = originalQty.split(" ");
        scaledInstruction = scaledInstruction.replace(
          regex,
          `${scaled} ${unit}`
        );
      }
    });
    
    return scaledInstruction;
  });

  return {
    ...originalMeal,
    calories: Math.round(totalCalories),
    protein: Math.round(originalMeal.protein * scaleFactor),
    carbs: Math.round(originalMeal.carbs * scaleFactor),
    fat: Math.round(originalMeal.fat * scaleFactor),
    recipe: {
      ...originalMeal.recipe,
      ingredients: scaledIngredients,
      instructions: scaledInstructions
    }
  };
};