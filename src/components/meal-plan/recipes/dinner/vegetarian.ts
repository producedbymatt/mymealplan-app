import { Meal } from "../../types";

export const vegetarianDinnerRecipes: Meal[] = [
  {
    name: "Vegetable Stir-Fry",
    calories: 350,
    protein: 12,
    carbs: 50,
    fat: 10,
    recipe: {
      ingredients: [
        "2 cups mixed vegetables (100 cal)",
        "1 cup cooked brown rice (215 cal)",
        "1 tbsp soy sauce (10 cal)",
        "1 tbsp olive oil (120 cal)",
        "1 tsp sesame seeds (10 cal)"
      ],
      instructions: [
        "Heat olive oil in a pan over medium heat.",
        "Add mixed vegetables and stir-fry for 5-7 minutes.",
        "Add cooked brown rice and soy sauce, stir to combine.",
        "Cook for an additional 2-3 minutes.",
        "Serve hot, garnished with sesame seeds."
      ],
      prepTime: "10 minutes",
      cookTime: "10 minutes"
    }
  },
  {
    name: "Chickpea Curry",
    calories: 400,
    protein: 15,
    carbs: 60,
    fat: 10,
    recipe: {
      ingredients: [
        "1 can chickpeas (200 cal)",
        "1 cup coconut milk (150 cal)",
        "1 cup spinach (7 cal)",
        "1 onion (40 cal)",
        "2 cloves garlic (10 cal)",
        "1 tbsp curry powder (20 cal)",
        "1 tbsp olive oil (120 cal)"
      ],
      instructions: [
        "Heat olive oil in a pot over medium heat.",
        "Add chopped onion and garlic, sauté until translucent.",
        "Stir in curry powder, then add chickpeas and coconut milk.",
        "Simmer for 10 minutes, then add spinach and cook until wilted.",
        "Serve with rice or bread."
      ],
      prepTime: "10 minutes",
      cookTime: "20 minutes"
    }
  },
  {
    name: "Vegetable Lasagna",
    calories: 450,
    protein: 20,
    carbs: 60,
    fat: 15,
    recipe: {
      ingredients: [
        "9 lasagna noodles (210 cal)",
        "2 cups marinara sauce (100 cal)",
        "1 cup ricotta cheese (300 cal)",
        "2 cups spinach (14 cal)",
        "1 cup mozzarella cheese (320 cal)",
        "1 zucchini (33 cal)",
        "1 bell pepper (30 cal)"
      ],
      instructions: [
        "Preheat oven to 375°F (190°C).",
        "Cook lasagna noodles according to package instructions.",
        "In a baking dish, layer noodles, marinara sauce, ricotta, spinach, and chopped vegetables.",
        "Repeat layers, finishing with mozzarella on top.",
        "Cover with foil and bake for 30 minutes, then remove foil and bake for an additional 15 minutes."
      ],
      prepTime: "20 minutes",
      cookTime: "45 minutes"
    }
  },
  {
    name: "Mediterranean Stuffed Peppers",
    calories: 440,
    protein: 18,
    carbs: 45,
    fat: 22,
    recipe: {
      ingredients: [
        "4 bell peppers (120 cal)",
        "1 cup quinoa, cooked (220 cal)",
        "1 can chickpeas (100 cal)",
        "1 cup cherry tomatoes (30 cal)",
        "2 oz feta cheese (150 cal)",
        "1 tbsp olive oil (120 cal)",
        "Fresh herbs (10 cal)"
      ],
      instructions: [
        "Preheat oven to 375°F (190°C)",
        "Cut peppers in half lengthwise and remove seeds",
        "Cook quinoa according to package instructions",
        "Mix cooked quinoa with drained chickpeas, halved tomatoes, and crumbled feta",
        "Season with herbs, salt, and pepper",
        "Fill pepper halves with quinoa mixture",
        "Drizzle with olive oil",
        "Bake for 25-30 minutes until peppers are tender"
      ],
      prepTime: "20 minutes",
      cookTime: "30 minutes"
    }
  }
];
