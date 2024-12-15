import { Meal } from "../../../types";

export const fishRecipes: Meal[] = [
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
        "Lemon and herbs (10 cal)"
      ],
      instructions: [
        "Season salmon with herbs",
        "Grill salmon until cooked",
        "Cook quinoa according to package",
        "Roast vegetables",
        "Serve with lemon"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Baked Cod with Quinoa",
    calories: 440,
    protein: 38,
    carbs: 40,
    fat: 15,
    recipe: {
      ingredients: [
        "6 oz cod fillet (140 cal)",
        "1 cup cooked quinoa (220 cal)",
        "1 cup roasted vegetables (50 cal)",
        "1 tbsp olive oil (120 cal)",
        "Lemon and herbs (10 cal)"
      ],
      instructions: [
        "Season cod with herbs and lemon",
        "Bake cod until flaky",
        "Cook quinoa according to package",
        "Roast vegetables with olive oil",
        "Serve cod over quinoa with vegetables"
      ],
      prepTime: "10 minutes",
      cookTime: "25 minutes"
    }
  }
];