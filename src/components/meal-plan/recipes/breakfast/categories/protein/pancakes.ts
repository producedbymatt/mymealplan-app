import { Meal } from "../../../../types";

export const proteinPancakeRecipes: Meal[] = [
  {
    name: "Protein Pancakes",
    calories: 480,
    protein: 28,
    carbs: 55,
    fat: 18,
    recipe: {
      ingredients: [
        "1 cup protein pancake mix (200 cal)",
        "1 scoop protein powder (120 cal)",
        "1 medium banana (105 cal)",
        "1 tbsp maple syrup (55 cal)"
      ],
      instructions: [
        "Mix pancake mix with protein powder",
        "Mash banana and add to mixture",
        "Cook pancakes on griddle",
        "Top with maple syrup"
      ],
      prepTime: "10 minutes",
      cookTime: "15 minutes"
    }
  }
];