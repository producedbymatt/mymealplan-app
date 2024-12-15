import { Meal } from "../types";

export const seafoodRecipes: Meal[] = [
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
    name: "Shrimp and Cauliflower Rice Bowl",
    calories: 410,
    protein: 35,
    carbs: 25,
    fat: 22,
    recipe: {
      ingredients: [
        "8 oz shrimp (240 cal)",
        "2 cups cauliflower rice (50 cal)",
        "1 cup mixed vegetables (50 cal)",
        "1 tbsp coconut oil (120 cal)",
        "Garlic and ginger (10 cal)"
      ],
      instructions: [
        "Sauté shrimp with garlic and ginger",
        "Rice cauliflower in food processor",
        "Cook cauliflower rice in coconut oil",
        "Steam mixed vegetables",
        "Combine all ingredients in bowl"
      ],
      prepTime: "15 minutes",
      cookTime: "15 minutes"
    }
  },
  // Add more seafood recipes...
];