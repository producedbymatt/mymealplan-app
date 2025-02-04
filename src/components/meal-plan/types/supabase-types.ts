export interface SupabaseRecipe {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prep_time: string;
  cook_time: string;
  ingredients: string[];
  instructions: string[];
  meal_type: string;
}

export interface SupabaseFavoriteRecipe {
  recipe_id: string;
  recipes: SupabaseRecipe;
}