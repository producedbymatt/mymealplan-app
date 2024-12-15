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
  {
    name: "Garlic Shrimp Pasta",
    calories: 520,
    protein: 35,
    carbs: 45,
    fat: 22,
    recipe: {
      ingredients: [
        "6 oz shrimp (180 cal)",
        "2 oz whole grain pasta (200 cal)",
        "2 cups vegetables (100 cal)",
        "1 tbsp olive oil (120 cal)",
        "Garlic and herbs (10 cal)",
        "Parmesan cheese (60 cal)"
      ],
      instructions: [
        "Cook pasta al dente",
        "Sauté garlic and vegetables",
        "Cook shrimp until pink",
        "Combine all ingredients",
        "Top with parmesan"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  },
  {
    name: "Cajun Seafood Bowl",
    calories: 490,
    protein: 40,
    carbs: 35,
    fat: 23,
    recipe: {
      ingredients: [
        "4 oz shrimp (120 cal)",
        "2 oz white fish (60 cal)",
        "1 cup cauliflower rice (25 cal)",
        "1 cup vegetables (50 cal)",
        "1 tbsp olive oil (120 cal)",
        "Cajun seasoning (15 cal)",
        "Lemon (20 cal)"
      ],
      instructions: [
        "Season seafood with Cajun spices",
        "Cook cauliflower rice",
        "Sauté vegetables",
        "Cook seafood",
        "Combine and add lemon"
      ],
      prepTime: "15 minutes",
      cookTime: "15 minutes"
    }
  },
  {
    name: "Poke Bowl",
    calories: 470,
    protein: 35,
    carbs: 40,
    fat: 20,
    recipe: {
      ingredients: [
        "6 oz sushi-grade tuna (180 cal)",
        "1 cup brown rice (130 cal)",
        "1 avocado (120 cal)",
        "Cucumber (8 cal)",
        "Seaweed (10 cal)",
        "Soy sauce (10 cal)",
        "Sesame oil (60 cal)"
      ],
      instructions: [
        "Cook brown rice",
        "Cube tuna",
        "Slice vegetables",
        "Make sauce",
        "Assemble bowl"
      ],
      prepTime: "20 minutes",
      cookTime: "25 minutes"
    }
  }
];
