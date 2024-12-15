import { Meal } from "./types";

export const mealOptionsPool: Meal[] = [
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
    name: "Tuna Avocado Salad",
    calories: 455,
    protein: 35,
    carbs: 15,
    fat: 25,
    recipe: {
      ingredients: [
        "2 cans tuna in water, drained (240 cal)",
        "1 medium avocado (160 cal)",
        "1/4 cup red onion, diced (15 cal)",
        "0.5 tbsp olive oil (60 cal)",
        "1 tbsp lemon juice (5 cal)",
        "2 cups mixed greens (10 cal)",
        "1/2 cup cherry tomatoes (25 cal)"
      ],
      instructions: [
        "Drain tuna and place in a bowl",
        "Mash avocado and mix with tuna",
        "Add diced red onion and lemon juice",
        "Add olive oil and mix well",
        "Serve over mixed greens with tomatoes"
      ],
      prepTime: "10 minutes",
      cookTime: "0 minutes"
    }
  },
  {
    name: "Chicken Stir-Fry",
    calories: 505,
    protein: 40,
    carbs: 35,
    fat: 15,
    recipe: {
      ingredients: [
        "6 oz chicken breast (165 cal)",
        "1.5 cups mixed vegetables (75 cal)",
        "2 tsp soy sauce (10 cal)",
        "1 tbsp olive oil (120 cal)",
        "1 cup brown rice (130 cal)",
        "2 cloves garlic (10 cal)",
        "1 tbsp ginger (5 cal)"
      ],
      instructions: [
        "Cook brown rice according to package instructions",
        "Heat oil in a large pan",
        "Cook diced chicken until golden",
        "Add minced garlic and ginger",
        "Add vegetables and stir-fry",
        "Add soy sauce and serve over rice"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
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
    name: "Salmon Power Bowl",
    calories: 570,
    protein: 35,
    carbs: 35,
    fat: 22,
    recipe: {
      ingredients: [
        "6 oz salmon fillet (270 cal)",
        "1 cup sweet potato, cubed (120 cal)",
        "1.5 cups broccoli (45 cal)",
        "1 tbsp olive oil (120 cal)",
        "1/2 lemon (10 cal)",
        "Fresh herbs (5 cal)",
        "3/4 cup quinoa, cooked (160 cal)"
      ],
      instructions: [
        "Cook quinoa according to package instructions",
        "Season salmon with herbs and lemon",
        "Roast sweet potato and broccoli",
        "Pan-sear salmon until cooked through",
        "Assemble bowl with quinoa base",
        "Top with vegetables and salmon"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  }
];