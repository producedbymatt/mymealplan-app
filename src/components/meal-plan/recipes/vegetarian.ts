import { Meal } from "../types";

export const vegetarianRecipes: Meal[] = [
  {
    name: "High-Protein Breakfast Bowl",
    calories: 450,
    protein: 35,
    carbs: 45,
    fat: 15,
    recipe: {
      ingredients: [
        "1.5 cups Greek yogurt (195 cal)",
        "1 cup mixed berries (80 cal)",
        "1/3 cup low-fat granola (40 cal)",
        "1.5 tbsp honey (90 cal)",
        "1 tbsp chia seeds (60 cal)",
        "1 oz sliced almonds (85 cal)"
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
        "1 cup quinoa, cooked (160 cal)",
        "3/4 cup chickpeas (180 cal)",
        "1 cup cherry tomatoes (50 cal)",
        "1 cucumber, diced (30 cal)",
        "1.5 oz feta cheese (113 cal)",
        "0.5 tbsp olive oil (60 cal)",
        "1 tbsp lemon juice (5 cal)"
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
  },
  {
    name: "Tofu Stir-Fry",
    calories: 450,
    protein: 30,
    carbs: 40,
    fat: 22,
    recipe: {
      ingredients: [
        "8 oz firm tofu (160 cal)",
        "2 cups mixed vegetables (100 cal)",
        "1 cup brown rice (130 cal)",
        "2 tbsp soy sauce (20 cal)",
        "1 tbsp sesame oil (120 cal)",
        "Ginger and garlic (10 cal)"
      ],
      instructions: [
        "Press and cube tofu",
        "Cook brown rice",
        "Stir-fry vegetables",
        "Cook tofu until crispy",
        "Combine with sauce"
      ],
      prepTime: "20 minutes",
      cookTime: "20 minutes"
    }
  },
  {
    name: "Lentil Curry Bowl",
    calories: 480,
    protein: 25,
    carbs: 55,
    fat: 18,
    recipe: {
      ingredients: [
        "1 cup red lentils (230 cal)",
        "1 cup brown rice (130 cal)",
        "1 cup spinach (7 cal)",
        "1 tbsp coconut oil (120 cal)",
        "Curry spices (10 cal)",
        "Coconut milk (60 cal)"
      ],
      instructions: [
        "Cook lentils with spices",
        "Prepare brown rice",
        "Add coconut milk to lentils",
        "Wilt spinach",
        "Combine in bowl"
      ],
      prepTime: "10 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Tempeh Buddha Bowl",
    calories: 520,
    protein: 28,
    carbs: 45,
    fat: 25,
    recipe: {
      ingredients: [
        "6 oz tempeh (230 cal)",
        "1 cup quinoa (220 cal)",
        "2 cups roasted vegetables (100 cal)",
        "1 tbsp olive oil (120 cal)",
        "Tahini sauce (50 cal)"
      ],
      instructions: [
        "Steam tempeh",
        "Cook quinoa",
        "Roast vegetables",
        "Make tahini sauce",
        "Assemble bowl"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  }
];
