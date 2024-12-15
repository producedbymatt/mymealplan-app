import { Meal } from "../../../../types";

export const shrimpRecipes: Meal[] = [
  {
    name: "Garlic Shrimp",
    calories: 420,
    protein: 35,
    carbs: 45,
    fat: 15,
    recipe: {
      ingredients: [
        "6 oz shrimp (180 cal)",
        "1 cup brown rice (220 cal)",
        "1 cup vegetables (50 cal)",
        "2 tbsp olive oil (240 cal)",
        "Garlic and herbs (10 cal)"
      ],
      instructions: [
        "Cook rice",
        "Sauté garlic",
        "Cook shrimp",
        "Add vegetables",
        "Combine and serve"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  }
];