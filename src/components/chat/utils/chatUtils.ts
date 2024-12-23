export const extractMealInfo = (message: string): { meal_name: string; calories: number } | null => {
  // Look for patterns like "X calories" or "X kcal"
  const calorieMatches = message.match(/(\d+)\s*(calories|kcal)/i);
  if (!calorieMatches) return null;

  const calories = parseInt(calorieMatches[1]);
  if (isNaN(calories)) return null;

  // Look for meal name patterns
  // This is a simple implementation - you might want to make it more sophisticated
  const mealNameMatch = message.match(/made\s+(?:a|an|some)?\s*([^,.!?]+)/i);
  if (!mealNameMatch) return null;

  const mealName = mealNameMatch[1].trim();
  if (!mealName) return null;

  return {
    meal_name: mealName,
    calories: calories
  };
};