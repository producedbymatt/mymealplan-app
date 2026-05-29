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

      const pickRandom = (pool: Meal[], n: number): Meal[] => {
        const temp = [...pool];
        const picked: Meal[] = [];
        for (let i = 0; i < n && temp.length > 0; i++) {
          const idx = Math.floor(Math.random() * temp.length);
          picked.push(temp[idx]);
          temp.splice(idx, 1);
        }
        return picked;
      };

      const availableOptions = allOptions.filter(meal => !excludeNames.has(meal.name));
      const selected = pickRandom(availableOptions, count);

      // If we couldn't fill `count` from unused recipes, fill the rest from
      // the full pool (excluding ones already selected) so refresh always
      // returns `count` meals when enough recipes exist for that time slot.
      if (selected.length < count) {
        const selectedNames = new Set(selected.map(m => m.name));
        const fallbackPool = allOptions.filter(m => !selectedNames.has(m.name));
        const needed = count - selected.length;
        selected.push(...pickRandom(fallbackPool, needed));
      }

      return selected;
    } catch (error) {
      console.error('Error generating meal options:', error);
      return [];
    }

  };

  return { generateMealOptions };
};