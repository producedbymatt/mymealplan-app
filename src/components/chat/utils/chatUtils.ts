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

  // If we have either calories or a meal name, return what we can
  if (mealNameMatch || caloriesMatch) {
    const mealInfo = {
      meal_name: mealNameMatch ? mealNameMatch[1].trim() : "Unknown Food Item",
      calories: caloriesMatch ? parseInt(caloriesMatch[1]) : 0
    };
    console.log('Extracted meal info:', mealInfo);
    return mealInfo;
  }

  return null;
};