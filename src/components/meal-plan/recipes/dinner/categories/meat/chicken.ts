import { Meal } from "../../../../types";

export const chickenRecipes: Meal[] = [
  {
    name: "Grilled Chicken",
    calories: 450,
    protein: 45,
    carbs: 35,
    fat: 18,
    recipe: {
      ingredients: [
        "6 oz chicken breast (270 cal)",
        "1 cup quinoa (220 cal)",
        "1 cup roasted vegetables (50 cal)",
        "1 tbsp olive oil (120 cal)",
        "Herbs and spices (10 cal)"
      ],
      instructions: [
        "Season chicken",
        "Grill until cooked through",
        "Cook quinoa",
        "Roast vegetables",
        "Serve together"
      ],
      prepTime: "15 minutes",
      cookTime: "30 minutes"
    }
  }
];