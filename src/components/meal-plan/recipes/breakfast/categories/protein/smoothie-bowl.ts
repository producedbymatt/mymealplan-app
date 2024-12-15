import { Meal } from "../../../../types";

export const smoothieBowlRecipes: Meal[] = [
  {
    name: "Protein Smoothie Bowl",
    calories: 450,
    protein: 30,
    carbs: 52,
    fat: 16,
    recipe: {
      ingredients: [
        "1 scoop protein powder (120 cal)",
        "1 frozen banana (105 cal)",
        "1 cup frozen berries (85 cal)",
        "1 cup almond milk (30 cal)",
        "1/4 cup granola (120 cal)"
      ],
      instructions: [
        "Blend protein powder, fruits, and milk",
        "Pour into bowl",
        "Top with granola",
        "Add additional toppings if desired"
      ],
      prepTime: "5 minutes",
      cookTime: "0 minutes"
    }
  }
];