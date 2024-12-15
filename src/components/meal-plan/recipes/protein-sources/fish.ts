import { Meal } from "../../types";

export const fishRecipes: Meal[] = [
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
  },
  {
    name: "Salmon Power Bowl",
    calories: 570,
    protein: 35,
    carbs: 35,
    fat: 22,
    recipe: {
      ingredients: [
        "6 oz salmon fillet (270 cal)",
        "1 cup sweet potato, cubed (120 cal)",
        "1.5 cups broccoli (45 cal)",
        "1 tbsp olive oil (120 cal)",
        "1/2 lemon (10 cal)",
        "Fresh herbs (5 cal)",
        "3/4 cup quinoa, cooked (160 cal)"
      ],
      instructions: [
        "Cook quinoa according to package instructions",
        "Season salmon with herbs and lemon",
        "Roast sweet potato and broccoli",
        "Pan-sear salmon until cooked through",
        "Assemble bowl with quinoa base",
        "Top with vegetables and salmon"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  },
  // Add more fish recipes...
];