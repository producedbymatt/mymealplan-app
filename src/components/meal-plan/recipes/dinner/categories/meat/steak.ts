import { Meal } from "../../../../types";

export const steakRecipes: Meal[] = [
  {
    name: "Grilled Steak",
    calories: 520,
    protein: 48,
    carbs: 30,
    fat: 22,
    recipe: {
      ingredients: [
        "6 oz steak (350 cal)",
        "2 cups roasted vegetables (100 cal)",
        "1 medium sweet potato (120 cal)",
        "1 tbsp olive oil (120 cal)",
        "Fresh herbs (15 cal)"
      ],
      instructions: [
        "Season steak",
        "Grill to desired doneness",
        "Roast vegetables",
        "Let meat rest",
        "Serve together"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  }
];