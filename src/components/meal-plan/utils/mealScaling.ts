import { Meal } from "../types";

export const scaleMeal = (originalMeal: Meal, targetCalories: number): Meal => {
  const scaleFactor = targetCalories / originalMeal.calories;
  let totalCalories = 0;
  
  // Scale ingredients and track quantities with their units
  const quantityMap = new Map<string, { original: number; scaled: number; unit: string }>();
  
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
    
    const scaledAmount = Math.round(amount * scaleFactor * 10) / 10; // Round to 1 decimal
    
    // Store the original and scaled amounts with their unit for instructions
    const key = `${amount}${unit}`;
    quantityMap.set(key, {
      original: amount,
      scaled: scaledAmount,
      unit
    });
    
    const remainingParts = parts.slice(2).join(" ").replace(/\(\d+) cal\)/, `(${scaledCalories} cal)`);
    return `${scaledAmount} ${unit} ${remainingParts}`;
  });

  // Scale instructions
  const scaledInstructions = originalMeal.recipe.instructions.map(instruction => {
    let scaledInstruction = instruction;
    
    // Look for quantity patterns in instructions
    quantityMap.forEach(({ original, scaled, unit }, key) => {
      // Create a regex that matches the number with optional decimals followed by the unit
      const numberPattern = original.toString().replace('.', '\\.');
      const regex = new RegExp(`\\b${numberPattern}\\s*${unit}\\b`, 'g');
      
      if (regex.test(instruction)) {
        scaledInstruction = scaledInstruction.replace(
          regex,
          `${scaled} ${unit}`
        );
      }
    });
    
    return scaledInstruction;
  });

  // Calculate scaled macros
  const scaledProtein = Math.round(originalMeal.protein * scaleFactor);
  const scaledCarbs = Math.round(originalMeal.carbs * scaleFactor);
  const scaledFat = Math.round(originalMeal.fat * scaleFactor);

  return {
    ...originalMeal,
    calories: Math.round(totalCalories),
    protein: scaledProtein,
    carbs: scaledCarbs,
    fat: scaledFat,
    recipe: {
      ...originalMeal.recipe,
      ingredients: scaledIngredients,
      instructions: scaledInstructions
    }
  };
};