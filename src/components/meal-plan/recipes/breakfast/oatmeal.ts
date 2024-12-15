import { Meal } from "../../types";

export const oatmealRecipes: Meal[] = [
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
  },
  {
    name: "Overnight Chia Pudding",
    calories: 420,
    protein: 18,
    carbs: 45,
    fat: 22,
    recipe: {
      ingredients: [
        "1/4 cup chia seeds (240 cal)",
        "1 cup almond milk (30 cal)",
        "1 tbsp honey (60 cal)",
        "1/2 cup mixed berries (40 cal)",
        "1 tbsp almond butter (98 cal)"
      ],
      instructions: [
        "Mix chia seeds with almond milk",
        "Add honey and stir well",
        "Refrigerate overnight",
        "Top with berries and almond butter"
      ],
      prepTime: "5 minutes",
      cookTime: "0 minutes"
    }
  }
];