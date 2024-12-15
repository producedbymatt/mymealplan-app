import { Meal } from "../../types";

export const eggRecipes: Meal[] = [
  {
    name: "Breakfast Burrito",
    calories: 520,
    protein: 32,
    carbs: 48,
    fat: 24,
    recipe: {
      ingredients: [
        "2 large eggs (140 cal)",
        "1 whole wheat tortilla (120 cal)",
        "1/4 cup black beans (60 cal)",
        "1 oz cheese (110 cal)",
        "2 tbsp salsa (20 cal)",
        "1/4 avocado (80 cal)"
      ],
      instructions: [
        "Scramble eggs",
        "Heat black beans",
        "Warm tortilla",
        "Assemble burrito with all ingredients",
        "Roll tightly"
      ],
      prepTime: "10 minutes",
      cookTime: "10 minutes"
    }
  },
  {
    name: "Avocado Toast with Eggs",
    calories: 440,
    protein: 22,
    carbs: 38,
    fat: 26,
    recipe: {
      ingredients: [
        "2 slices whole grain bread (160 cal)",
        "1 medium avocado (160 cal)",
        "2 poached eggs (140 cal)",
        "Red pepper flakes (5 cal)",
        "Salt and pepper (0 cal)"
      ],
      instructions: [
        "Toast bread",
        "Mash avocado and spread on toast",
        "Poach eggs",
        "Top toast with eggs",
        "Season with spices"
      ],
      prepTime: "10 minutes",
      cookTime: "8 minutes"
    }
  }
];