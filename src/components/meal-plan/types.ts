export interface Recipe {
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
}

export interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  recipe: Recipe;
  isFavorite?: boolean;
}

export interface MealTimeSlot {
  time: string;
  options: Meal[];
}