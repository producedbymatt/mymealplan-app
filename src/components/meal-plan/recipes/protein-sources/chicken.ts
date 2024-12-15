import { Meal } from "../../types";

export const chickenRecipes: Meal[] = [
  {
    name: "Chicken Stir-Fry",
    calories: 505,
    protein: 40,
    carbs: 35,
    fat: 15,
    recipe: {
      ingredients: [
        "6 oz chicken breast (165 cal)",
        "1.5 cups mixed vegetables (75 cal)",
        "2 tsp soy sauce (10 cal)",
        "1 tbsp olive oil (120 cal)",
        "1 cup brown rice (130 cal)",
        "2 cloves garlic (10 cal)",
        "1 tbsp ginger (5 cal)"
      ],
      instructions: [
        "Cook brown rice according to package instructions",
        "Heat oil in a large pan",
        "Cook diced chicken until golden",
        "Add minced garlic and ginger",
        "Add vegetables and stir-fry",
        "Add soy sauce and serve over rice"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  },
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
  },
  // Add more chicken recipes...
];