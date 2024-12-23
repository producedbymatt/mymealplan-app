export const extractMealInfo = (content: string) => {
  console.log('Extracting meal info from:', content);
  
  // Look for meal name between single quotes
  const mealNameMatch = content.match(/'([^']+)'/);
  if (!mealNameMatch) {
    console.log('No meal name found between single quotes');
  }

  // Look for calories number with more flexible pattern
  const caloriesMatch = content.match(/contains approximately (\d+) calories/i);
  if (!caloriesMatch) {
    console.log('No calories found');
  }

  // Try to extract food item name from the question if no quoted name found
  let guessedMealName = "Unknown Food Item";
  if (!mealNameMatch) {
    // Look for common food-related words in the user's question
    const foodWordMatch = content.toLowerCase().match(/(?:a |an |one )?([a-z\s]+?)(?:\s+contains? approximately|\s+has|\s+is)/i);
    if (foodWordMatch && foodWordMatch[1]) {
      // Clean up and capitalize the first letter of each word
      guessedMealName = foodWordMatch[1]
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      console.log('Guessed meal name:', guessedMealName);
    }
  }

  // If we have either calories or a meal name, return what we can
  if (mealNameMatch || caloriesMatch) {
    const mealInfo = {
      meal_name: mealNameMatch ? mealNameMatch[1].trim() : guessedMealName,
      calories: caloriesMatch ? parseInt(caloriesMatch[1]) : 0
    };
    console.log('Extracted meal info:', mealInfo);
    return mealInfo;
  }

  return null;
};