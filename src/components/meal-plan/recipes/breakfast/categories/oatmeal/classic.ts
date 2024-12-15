import { Meal } from "../../../../types";

export const classicOatmealRecipes: Meal[] = [
  {
    name: "Classic Oatmeal with Berries",
    calories: 450,
    protein: 15,
    carbs: 65,
    fat: 12,
    recipe: {
      ingredients: [
        "1 cup rolled oats (300 cal)",
        "1 cup mixed berries (85 cal)",
        "1 tbsp honey (60 cal)",
        "1/4 cup almonds (160 cal)",
        "1 cup almond milk (30 cal)"
      ],
      instructions: [
        "Cook oats with almond milk",
        "Top with mixed berries",
        "Drizzle with honey",
        "Sprinkle almonds on top"
      ],
      prepTime: "5 minutes",
      cookTime: "10 minutes"
    }
  }
];