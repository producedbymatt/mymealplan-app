import { Meal } from "../../types";

export const sandwichRecipes: Meal[] = [
  {
    name: "Turkey Avocado Wrap",
    calories: 480,
    protein: 35,
    carbs: 40,
    fat: 22,
    recipe: {
      ingredients: [
        "2 slices turkey breast (100 cal)",
        "1 whole wheat wrap (120 cal)",
        "1 medium avocado (160 cal)",
        "1 cup mixed greens (10 cal)",
        "2 tbsp hummus (70 cal)"
      ],
      instructions: [
        "Spread hummus on wrap",
        "Layer turkey and avocado",
        "Add mixed greens",
        "Roll wrap tightly",
        "Cut diagonally"
      ],
      prepTime: "10 minutes",
      cookTime: "0 minutes"
    }
  },
  {
    name: "Veggie Hummus Sandwich",
    calories: 420,
    protein: 18,
    carbs: 52,
    fat: 20,
    recipe: {
      ingredients: [
        "2 slices whole grain bread (160 cal)",
        "1/4 cup hummus (120 cal)",
        "1 cucumber (8 cal)",
        "1 tomato (22 cal)",
        "1/2 avocado (160 cal)"
      ],
      instructions: [
        "Toast bread",
        "Spread hummus",
        "Layer vegetables",
        "Add avocado",
        "Cut and serve"
      ],
      prepTime: "10 minutes",
      cookTime: "0 minutes"
    }
  }
];