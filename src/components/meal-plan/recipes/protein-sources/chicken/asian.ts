import { Meal } from "../../../types";

export const asianChickenRecipes: Meal[] = [
  {
    name: "Chicken Teriyaki Bowl",
    calories: 525,
    protein: 42,
    carbs: 45,
    fat: 20,
    recipe: {
      ingredients: [
        "6 oz chicken breast (165 cal)",
        "1 cup brown rice (130 cal)",
        "1 cup mixed vegetables (50 cal)",
        "2 tbsp teriyaki sauce (60 cal)",
        "1 tbsp sesame oil (120 cal)",
        "Ginger and garlic (10 cal)"
      ],
      instructions: [
        "Cook brown rice",
        "Slice chicken into strips",
        "Stir-fry vegetables",
        "Cook chicken with teriyaki sauce",
        "Combine all ingredients in bowl"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Asian Sesame Chicken",
    calories: 510,
    protein: 43,
    carbs: 40,
    fat: 21,
    recipe: {
      ingredients: [
        "6 oz chicken breast (165 cal)",
        "1 cup brown rice (130 cal)",
        "2 cups broccoli (60 cal)",
        "2 tbsp sesame oil (120 cal)",
        "1 tbsp soy sauce (10 cal)",
        "1 tbsp honey (60 cal)",
        "Sesame seeds (25 cal)"
      ],
      instructions: [
        "Cook brown rice",
        "Steam broccoli",
        "Cook chicken in sesame oil",
        "Mix sauce with soy sauce and honey",
        "Combine all ingredients",
        "Garnish with sesame seeds"
      ],
      prepTime: "10 minutes",
      cookTime: "25 minutes"
    }
  }
];