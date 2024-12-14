import { Meal } from "./types";

export const mealOptionsPool: Meal[] = [
  {
    name: "High-Protein Breakfast Bowl",
    calories: 600,
    protein: 40,
    carbs: 55,
    fat: 25,
    recipe: {
      ingredients: [
        "2 cups Greek yogurt",
        "1 cup mixed berries",
        "1/2 cup granola",
        "2 tbsp honey",
        "2 tbsp chia seeds",
        "1/4 cup almonds",
        "1 scoop protein powder"
      ],
      instructions: [
        "Mix Greek yogurt with protein powder",
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
    name: "Hearty Tuna Avocado Salad",
    calories: 590,
    protein: 45,
    carbs: 30,
    fat: 35,
    recipe: {
      ingredients: [
        "2 cans tuna, drained",
        "2 ripe avocados",
        "1/2 cup red onion, diced",
        "2 tbsp olive oil",
        "2 tbsp lemon juice",
        "2 cups mixed greens",
        "1/4 cup cherry tomatoes",
        "2 hard-boiled eggs"
      ],
      instructions: [
        "Drain tuna and place in a bowl",
        "Mash avocados and mix with tuna",
        "Add diced red onion and lemon juice",
        "Add olive oil and mix well",
        "Serve over mixed greens with sliced eggs and tomatoes"
      ],
      prepTime: "15 minutes",
      cookTime: "0 minutes"
    }
  },
  {
    name: "Protein-Packed Chicken Stir-Fry",
    calories: 610,
    protein: 45,
    carbs: 50,
    fat: 25,
    recipe: {
      ingredients: [
        "300g chicken breast, diced",
        "2 cups mixed vegetables",
        "3 tbsp soy sauce",
        "2 tbsp olive oil",
        "1.5 cups brown rice",
        "2 cloves garlic",
        "1 tbsp ginger"
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
    name: "Mediterranean Power Bowl",
    calories: 580,
    protein: 35,
    carbs: 65,
    fat: 25,
    recipe: {
      ingredients: [
        "1.5 cups quinoa",
        "2 cups chickpeas",
        "1 cup cherry tomatoes",
        "1 cucumber",
        "100g feta cheese",
        "2 tbsp olive oil",
        "2 tbsp lemon juice",
        "Mixed herbs"
      ],
      instructions: [
        "Cook quinoa according to package instructions",
        "Combine with chickpeas and chopped vegetables",
        "Top with crumbled feta",
        "Mix herbs with olive oil and lemon juice",
        "Drizzle dressing over bowl"
      ],
      prepTime: "10 minutes",
      cookTime: "20 minutes"
    }
  },
  {
    name: "Salmon Power Bowl",
    calories: 620,
    protein: 42,
    carbs: 45,
    fat: 30,
    recipe: {
      ingredients: [
        "250g salmon fillet",
        "2 cups sweet potato, cubed",
        "2 cups broccoli",
        "2 tbsp olive oil",
        "1 lemon",
        "Fresh herbs",
        "1 cup quinoa"
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