import { Meal } from "../../types";

export const vegetarianBowls: Meal[] = [
  {
    name: "High-Protein Breakfast Bowl",
    calories: 450,
    protein: 35,
    carbs: 45,
    fat: 15,
    recipe: {
      ingredients: [
        "1.5 cups Greek yogurt",
        "1 cup mixed berries",
        "0.5 cup low-fat granola",
        "1.5 tbsp honey",
        "1 tbsp chia seeds",
        "1 oz sliced almonds"
      ],
      instructions: [
        "Mix Greek yogurt in a bowl",
        "Add mixed berries",
        "Top with granola and chia seeds",
        "Sprinkle almonds",
        "Drizzle with honey"
      ],
      prepTime: "5 minutes",
      cookTime: "0 minutes"
    }
  },
  {
    name: "Mediterranean Bowl",
    calories: 508,
    protein: 20,
    carbs: 45,
    fat: 18,
    recipe: {
      ingredients: [
        "1 cup quinoa, cooked",
        "0.5 cup chickpeas",
        "1 cup cherry tomatoes",
        "1 cucumber, diced",
        "1.5 oz feta cheese",
        "0.5 tbsp olive oil",
        "1 tbsp lemon juice"
      ],
      instructions: [
        "Cook quinoa according to package instructions",
        "Combine with chickpeas and chopped vegetables",
        "Top with crumbled feta",
        "Mix olive oil and lemon juice",
        "Drizzle dressing over bowl"
      ],
      prepTime: "10 minutes",
      cookTime: "20 minutes"
    }
  }
];