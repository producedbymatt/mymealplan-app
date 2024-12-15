import { Meal } from "../../types";

export const beefRecipes: Meal[] = [
  {
    name: "Grilled Steak with Sweet Potato",
    calories: 520,
    protein: 45,
    carbs: 30,
    fat: 25,
    recipe: {
      ingredients: [
        "6 oz lean beef steak (300 cal)",
        "1 medium sweet potato (120 cal)",
        "2 cups mixed vegetables (50 cal)",
        "1 tbsp olive oil (120 cal)",
        "Fresh herbs and spices (5 cal)"
      ],
      instructions: [
        "Season steak with salt and pepper",
        "Grill steak to desired doneness",
        "Bake sweet potato until tender",
        "Steam mixed vegetables",
        "Drizzle with olive oil and season"
      ],
      prepTime: "10 minutes",
      cookTime: "20 minutes"
    }
  },
  // Add more beef recipes...
];