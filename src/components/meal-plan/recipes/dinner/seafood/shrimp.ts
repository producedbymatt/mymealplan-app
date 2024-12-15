import { Meal } from "../../../types";

export const shrimpRecipes: Meal[] = [
  {
    name: "Shrimp Scampi",
    calories: 520,
    protein: 35,
    carbs: 45,
    fat: 24,
    recipe: {
      ingredients: [
        "6 oz shrimp (180 cal)",
        "2 oz pasta (200 cal)",
        "2 tbsp butter (200 cal)",
        "2 cloves garlic (10 cal)",
        "1/4 cup white wine (25 cal)",
        "Fresh parsley (5 cal)"
      ],
      instructions: [
        "Cook pasta",
        "Sauté garlic in butter",
        "Cook shrimp",
        "Add wine and reduce",
        "Combine with pasta"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  }
];