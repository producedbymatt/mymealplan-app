export interface ExtractedMealInfo {
  meal_name: string;
  calories: number;
  protein: number;
  carbs: number;
  sugars: number;
}

export const extractMealInfo = (content: string): ExtractedMealInfo | null => {
  const mealNameMatch = content.match(/'([^']+)'/);

  // Try to match a calorie range first (e.g., "250-300 calories" or "250 to 300 calories")
  const caloriesRangeDash = content.match(/contains approximately (\d+)[-–](\d+) calories/i);
  const caloriesRangeTo = content.match(/contains approximately (\d+) to (\d+) calories/i);
  const caloriesSingle = content.match(/contains approximately (\d+) calories/i);

  let calories = 0;
  if (caloriesRangeDash) {
    calories = parseInt(caloriesRangeDash[2]); // higher end of dash range
  } else if (caloriesRangeTo) {
    calories = parseInt(caloriesRangeTo[2]); // higher end of "to" range
  } else if (caloriesSingle) {
    calories = parseInt(caloriesSingle[1]);
  }

  let guessedMealName = "Unknown Food Item";
  if (!mealNameMatch) {
    const foodWordMatch = content
      .toLowerCase()
      .match(/(?:a |an |one )?([a-z\s]+?)(?:\s+contains? approximately|\s+has|\s+is)/i);
    if (foodWordMatch && foodWordMatch[1]) {
      guessedMealName = foodWordMatch[1]
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  }

  const proteinMatch = content.match(/(\d+)\s*g\s*protein/i);
  const carbsMatch = content.match(/(\d+)\s*g\s*carbs/i);
  const sugarsMatch = content.match(/(\d+)\s*g\s*sugars?/i);

  if (mealNameMatch || caloriesRangeDash || caloriesRangeTo || caloriesSingle) {
    return {
      meal_name: mealNameMatch ? mealNameMatch[1].trim() : guessedMealName,
      calories,
      protein: proteinMatch ? parseInt(proteinMatch[1]) : 0,
      carbs: carbsMatch ? parseInt(carbsMatch[1]) : 0,
      sugars: sugarsMatch ? parseInt(sugarsMatch[1]) : 0,
    };
  }

  return null;
};
