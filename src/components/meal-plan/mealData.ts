import { Meal } from "./types";

export const mealOptionsPool: Meal[] = [
  {
    name: "High-Protein Breakfast Bowl",
    calories: 450, // 130 + 40 + 120 + 60 + 60 + 40 = 450
    protein: 35,
    carbs: 45,
    fat: 15,
    recipe: {
      ingredients: [
        "1 cup Greek yogurt (130 cal)",
        "1/2 cup mixed berries (40 cal)",
        "1/4 cup low-fat granola (120 cal)",
        "1 tbsp honey (60 cal)",
        "1 tbsp chia seeds (60 cal)",
        "2 tbsp sliced almonds (40 cal)"
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
    calories: 455, // 120 + 160 + 15 + 120 + 5 + 10 + 25 = 455
    protein: 35,
    carbs: 15,
    fat: 25,
    recipe: {
      ingredients: [
        "1 can tuna in water, drained (120 cal)",
        "1 medium avocado (160 cal)",
        "1/4 cup red onion, diced (15 cal)",
        "1 tbsp olive oil (120 cal)",
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
    calories: 505, // 165 + 50 + 10 + 120 + 150 + 5 + 5 = 505
    protein: 40,
    carbs: 35,
    fat: 15,
    recipe: {
      ingredients: [
        "5 oz chicken breast (165 cal)",
        "1 cup mixed vegetables (50 cal)",
        "2 tsp soy sauce (10 cal)",
        "1 tbsp olive oil (120 cal)",
        "3/4 cup brown rice (150 cal)",
        "1 clove garlic (5 cal)",
        "1 tsp ginger (5 cal)"
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
    calories: 508, // 160 + 120 + 25 + 8 + 70 + 120 + 5 = 508
    protein: 20,
    carbs: 45,
    fat: 18,
    recipe: {
      ingredients: [
        "3/4 cup quinoa (160 cal)",
        "1/2 cup chickpeas (120 cal)",
        "1/2 cup cherry tomatoes (25 cal)",
        "1/2 cucumber (8 cal)",
        "1 oz feta cheese (70 cal)",
        "1 tbsp olive oil (120 cal)",
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
    calories: 570, // 180 + 120 + 30 + 120 + 10 + 0 + 110 = 570
    protein: 35,
    carbs: 35,
    fat: 22,
    recipe: {
      ingredients: [
        "4 oz salmon fillet (180 cal)",
        "1 cup sweet potato, cubed (120 cal)",
        "1 cup broccoli (30 cal)",
        "1 tbsp olive oil (120 cal)",
        "1/2 lemon (10 cal)",
        "Fresh herbs (0 cal)",
        "1/2 cup quinoa (110 cal)"
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