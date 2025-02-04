import { getMealOptionsForTime } from "../mealData";
import { Meal } from "../types";

export const useMealGeneration = () => {
  const generateMealOptions = async (
    timeSlot: string, 
    caloriesPerMeal: number, 
    excludeNames: Set<string>, 
    count: number = 2
  ): Promise<Meal[]> => {
    try {
      const allOptions = await getMealOptionsForTime(timeSlot);
      console.log(`Retrieved ${allOptions.length} options for ${timeSlot}`);
      
      const availableOptions = allOptions.filter(meal => !excludeNames.has(meal.name));
      
      if (availableOptions.length === 0) {
        console.log('No unique recipes available, resetting used recipes list');
        return allOptions.length > 0 ? [allOptions[0]] : [];
      }

      const selectedMeals: Meal[] = [];
      const tempAvailable = [...availableOptions];
      
      for (let i = 0; i < count && tempAvailable.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * tempAvailable.length);
        const selectedMeal = tempAvailable[randomIndex];
        selectedMeals.push(selectedMeal);
        tempAvailable.splice(randomIndex, 1);
      }

      return selectedMeals;
    } catch (error) {
      console.error('Error generating meal options:', error);
      return [];
    }
  };

  return { generateMealOptions };
};