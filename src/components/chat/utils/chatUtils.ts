export const extractMealInfo = (message: string): { meal_name: string; calories: number } | null => {
  // Look for patterns like "X calories" or "X kcal"
  const calorieMatches = message.match(/(\d+)\s*(calories|kcal)/i);
  if (!calorieMatches) return null;

  const calories = parseInt(calorieMatches[1]);
  if (isNaN(calories)) return null;

  // Extract meal name from AI response
  // This will match any text between quotes that appears before the calorie count
  const mealNameMatch = message.match(/"([^"]+)"/);
  if (!mealNameMatch) return null;

  const mealName = mealNameMatch[1].trim();
  if (!mealName) return null;

  return {
    meal_name: mealName,
    calories: calories
  };
};