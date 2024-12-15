import { Meal } from "../../../types";

export const grilledFishRecipes: Meal[] = [
  {
    name: "Grilled Salmon with Quinoa",
    calories: 550,
    protein: 45,
    carbs: 35,
    fat: 25,
    recipe: {
      ingredients: [
        "6 oz salmon fillet (270 cal)",
        "1 cup quinoa (220 cal)",
        "2 cups roasted vegetables (100 cal)",
        "1 tbsp olive oil (120 cal)",
        "1 lemon (10 cal)",
        "Fresh herbs (5 cal)"
      ],
      instructions: [
        "Rinse quinoa thoroughly under cold water using a fine-mesh strainer",
        "Cook quinoa in 2 cups of water: bring to boil, reduce heat, simmer covered for 20 minutes",
        "While quinoa cooks, brush salmon with 1/2 tbsp olive oil and season with salt, pepper, and herbs",
        "Toss vegetables with remaining olive oil and spread on a baking sheet",
        "Roast vegetables in preheated 400°F oven for 20-25 minutes, stirring halfway",
        "Grill salmon skin-side up for 4 minutes, then flip and cook 3-4 minutes more",
        "Squeeze half the lemon over the salmon while it cooks",
        "Fluff quinoa with a fork and portion onto plates",
        "Top with grilled salmon and roasted vegetables",
        "Serve with remaining lemon wedges"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  }
];