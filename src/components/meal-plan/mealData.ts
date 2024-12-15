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
  },
  {
    name: "Grilled Steak with Sweet Potato",
    calories: 520,
    protein: 45,
    carbs: 30,
    fat: 25,
    recipe: {
      ingredients: [
        "6 oz lean beef steak (300 cal)",
        "1 medium sweet potato (120 cal)",
        "2 cups mixed vegetables (50 cal)",
        "1 tbsp olive oil (120 cal)",
        "Fresh herbs and spices (5 cal)"
      ],
      instructions: [
        "Season steak with salt and pepper",
        "Grill steak to desired doneness",
        "Bake sweet potato until tender",
        "Steam mixed vegetables",
        "Drizzle with olive oil and season"
      ],
      prepTime: "10 minutes",
      cookTime: "20 minutes"
    }
  },
  {
    name: "Baked Cod with Quinoa",
    calories: 440,
    protein: 38,
    carbs: 40,
    fat: 15,
    recipe: {
      ingredients: [
        "6 oz cod fillet (140 cal)",
        "1 cup cooked quinoa (220 cal)",
        "1 cup roasted vegetables (50 cal)",
        "1 tbsp olive oil (120 cal)",
        "Lemon and herbs (10 cal)"
      ],
      instructions: [
        "Season cod with herbs and lemon",
        "Bake cod until flaky",
        "Cook quinoa according to package",
        "Roast vegetables with olive oil",
        "Serve cod over quinoa with vegetables"
      ],
      prepTime: "10 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Turkey Meatballs with Zucchini Noodles",
    calories: 480,
    protein: 42,
    carbs: 20,
    fat: 28,
    recipe: {
      ingredients: [
        "6 oz ground turkey (280 cal)",
        "2 medium zucchini, spiralized (60 cal)",
        "1/2 cup marinara sauce (60 cal)",
        "1 oz parmesan cheese (110 cal)",
        "1 tbsp olive oil (120 cal)"
      ],
      instructions: [
        "Mix turkey with herbs and form meatballs",
        "Bake meatballs until cooked through",
        "Spiralize zucchini into noodles",
        "Sauté zucchini noodles in olive oil",
        "Top with meatballs, sauce, and cheese"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
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
    name: "Pork Tenderloin with Roasted Vegetables",
    calories: 490,
    protein: 40,
    carbs: 35,
    fat: 23,
    recipe: {
      ingredients: [
        "6 oz pork tenderloin (280 cal)",
        "2 cups roasted vegetables (100 cal)",
        "1 medium sweet potato (120 cal)",
        "1 tbsp olive oil (120 cal)",
        "Herbs and spices (10 cal)"
      ],
      instructions: [
        "Season pork with herbs and spices",
        "Roast pork until cooked through",
        "Cut vegetables into equal sizes",
        "Roast vegetables with olive oil",
        "Let pork rest before slicing"
      ],
      prepTime: "10 minutes",
      cookTime: "25 minutes"
    }
  }
];
