export const extractMealInfo = (content: string) => {
  console.log('Extracting meal info from:', content);
  
  // Look for meal name between ** markers or single quotes
  const mealNameMatch = content.match(/\*\*([^*]+)\*\*/) || content.match(/['']([^'']+)['']/);
  if (!mealNameMatch) {
    console.log('No meal name found between ** markers or single quotes');
    return null;
  }

  // Look for calories number with more flexible pattern
  const caloriesMatch = content.match(/(?:approximately|contains|about)\s*(?:\*\*)?(\d+)\s*calories/i);
  if (!caloriesMatch) {
    console.log('No calories found');
    return null;
  }

  const mealInfo = {
    meal_name: mealNameMatch[1].trim(),
    calories: parseInt(caloriesMatch[1])
  };

  console.log('Extracted meal info:', mealInfo);
  return mealInfo;
};