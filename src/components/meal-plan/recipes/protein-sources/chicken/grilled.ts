import { Meal } from "../../../types";

export const grilledChickenRecipes: Meal[] = [
  {
    name: "Lemon Herb Grilled Chicken",
    calories: 450,
    protein: 45,
    carbs: 20,
    fat: 22,
    recipe: {
      ingredients: [
        "8 oz chicken breast (220 cal)",
        "1 tbsp olive oil (120 cal)",
        "2 cups roasted vegetables (100 cal)",
        "1 lemon (10 cal)",
        "Fresh herbs (5 cal)"
      ],
      instructions: [
        "Marinate chicken with lemon, herbs, and oil",
        "Preheat grill to medium-high",
        "Grill chicken 6-7 minutes per side",
        "Roast vegetables until tender",
        "Let chicken rest before serving"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  }
];