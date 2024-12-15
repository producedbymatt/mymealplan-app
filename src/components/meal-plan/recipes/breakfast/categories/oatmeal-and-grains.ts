import { Meal } from "../../../types";

export const oatmealAndGrainRecipes: Meal[] = [
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
        "Pour 1 cup almond milk into a medium saucepan and bring to a gentle simmer over medium heat",
        "Add 1 cup rolled oats to the simmering almond milk, stirring to combine",
        "Reduce heat to low and cook for 5-7 minutes, stirring occasionally until oats are tender and have absorbed most of the liquid",
        "While oats are cooking, rinse 1 cup of mixed berries and set aside",
        "Roughly chop 1/4 cup of almonds into smaller pieces",
        "Once oats are cooked, remove from heat and let stand for 1 minute",
        "Transfer oatmeal to a serving bowl",
        "Drizzle 1 tablespoon of honey evenly over the oatmeal",
        "Top with the prepared mixed berries",
        "Sprinkle the chopped almonds over everything",
        "Serve immediately while hot"
      ],
      prepTime: "5 minutes",
      cookTime: "10 minutes"
    }
  },
  {
    name: "Breakfast Quinoa Bowl",
    calories: 430,
    protein: 16,
    carbs: 62,
    fat: 14,
    recipe: {
      ingredients: [
        "1 cup cooked quinoa (220 cal)",
        "1 cup almond milk (30 cal)",
        "1 tbsp honey (60 cal)",
        "1/2 cup mixed berries (40 cal)",
        "1 tbsp almonds (80 cal)"
      ],
      instructions: [
        "Rinse 1/2 cup dry quinoa thoroughly under cold water using a fine-mesh strainer",
        "In a medium saucepan, combine the rinsed quinoa with 1 cup of water",
        "Bring to a boil, then reduce heat to low and cover",
        "Simmer for 15-20 minutes until quinoa is tender and water is absorbed",
        "While quinoa is still hot, stir in 1/2 cup of almond milk to create a creamier consistency",
        "Warm the remaining 1/2 cup of almond milk in a small saucepan until just heated",
        "Pour the warmed almond milk over the quinoa",
        "Drizzle 1 tablespoon of honey evenly over the quinoa mixture",
        "Gently fold in 1/2 cup of mixed berries",
        "Roughly chop 1 tablespoon of almonds",
        "Sprinkle the chopped almonds over the top",
        "Serve while still warm"
      ],
      prepTime: "5 minutes",
      cookTime: "20 minutes"
    }
  }
];