import { Meal } from "../../../../types";

export const fishRecipes: Meal[] = [
  {
    name: "Grilled Salmon",
    calories: 450,
    protein: 42,
    carbs: 35,
    fat: 20,
    recipe: {
      ingredients: [
        "6 oz salmon fillet (270 cal)",
        "1 cup quinoa (220 cal)",
        "1 cup vegetables (50 cal)",
        "1 tbsp olive oil (120 cal)",
        "Lemon and herbs (10 cal)"
      ],
      instructions: [
        "Season salmon",
        "Grill until cooked",
        "Cook quinoa",
        "Steam vegetables",
        "Serve with lemon"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  }
];