export interface ExtractedMealInfo {
  meal_name: string;
  calories: number;
  protein: number;
  carbs: number;
  sugars: number;
}

export const extractMealInfo = (content: string): ExtractedMealInfo | null => {
  const mealNameMatch = content.match(/'([^']+)'/);
  const caloriesMatch = content.match(/contains approximately (\d+) calories/i);

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

  if (mealNameMatch || caloriesMatch) {
    return {
      meal_name: mealNameMatch ? mealNameMatch[1].trim() : guessedMealName,
      calories: caloriesMatch ? parseInt(caloriesMatch[1]) : 0,
      protein: proteinMatch ? parseInt(proteinMatch[1]) : 0,
      carbs: carbsMatch ? parseInt(carbsMatch[1]) : 0,
      sugars: sugarsMatch ? parseInt(sugarsMatch[1]) : 0,
    };
  }

  return null;
};
