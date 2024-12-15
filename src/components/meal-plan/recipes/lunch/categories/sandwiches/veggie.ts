import { Meal } from "../../../../types";

export const veggieRecipes: Meal[] = [
  {
    name: "Veggie Hummus Sandwich",
    calories: 420,
    protein: 18,
    carbs: 52,
    fat: 20,
    recipe: {
      ingredients: [
        "2 slices whole grain bread (160 cal)",
        "1/4 cup hummus (120 cal)",
        "1 cucumber (8 cal)",
        "1 tomato (22 cal)",
        "1/2 avocado (160 cal)"
      ],
      instructions: [
        "Toast bread",
        "Spread hummus",
        "Layer vegetables",
        "Add avocado",
        "Cut and serve"
      ],
      prepTime: "10 minutes",
      cookTime: "0 minutes"
    }
  }
];