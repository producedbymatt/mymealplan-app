import { Message } from '../types';

export const extractMealInfo = (content: string) => {
  console.log('Extracting meal info from:', content);
  
  // Look for meal name in bold (between ** **)
  const mealNameMatch = content.match(/\*\*(.*?)\*\*/);
  if (!mealNameMatch) {
    console.log('No meal name found in bold text');
    return null;
  }

  // Look for calories number
  const caloriesMatch = content.match(/approximately\s*(\d+)\s*calories/i);
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