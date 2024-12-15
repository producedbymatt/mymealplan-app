import { Meal } from "../../types";

export const beefRecipes: Meal[] = [
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
    name: "Lean Beef Stir-Fry",
    calories: 510,
    protein: 45,
    carbs: 35,
    fat: 22,
    recipe: {
      ingredients: [
        "6 oz lean beef strips (280 cal)",
        "2 cups mixed vegetables (100 cal)",
        "1 cup brown rice (130 cal)",
        "1 tbsp sesame oil (120 cal)",
        "Soy sauce (10 cal)",
        "Ginger and garlic (10 cal)"
      ],
      instructions: [
        "Cook brown rice",
        "Stir-fry vegetables",
        "Cook beef strips",
        "Combine with sauce",
        "Serve over rice"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  },
  {
    name: "Beef and Quinoa Bowl",
    calories: 520,
    protein: 42,
    carbs: 40,
    fat: 24,
    recipe: {
      ingredients: [
        "6 oz ground beef (280 cal)",
        "1 cup quinoa (220 cal)",
        "1 cup roasted vegetables (50 cal)",
        "1 tbsp olive oil (120 cal)",
        "Herbs and spices (10 cal)"
      ],
      instructions: [
        "Cook quinoa",
        "Brown ground beef",
        "Roast vegetables",
        "Season with herbs",
        "Combine in bowl"
      ],
      prepTime: "10 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Spicy Beef Fajitas",
    calories: 490,
    protein: 40,
    carbs: 35,
    fat: 25,
    recipe: {
      ingredients: [
        "6 oz beef strips (280 cal)",
        "2 tortillas (180 cal)",
        "1 bell pepper (30 cal)",
        "1 onion (40 cal)",
        "1 tbsp olive oil (120 cal)",
        "Fajita seasoning (10 cal)"
      ],
      instructions: [
        "Slice peppers and onions",
        "Cook beef strips",
        "Sauté vegetables",
        "Warm tortillas",
        "Assemble fajitas"
      ],
      prepTime: "15 minutes",
      cookTime: "15 minutes"
    }
  },
  {
    name: "Asian Beef Lettuce Wraps",
    calories: 450,
    protein: 38,
    carbs: 20,
    fat: 26,
    recipe: {
      ingredients: [
        "6 oz ground beef (280 cal)",
        "1 head lettuce (10 cal)",
        "1 carrot (25 cal)",
        "2 tbsp hoisin sauce (60 cal)",
        "1 tbsp sesame oil (120 cal)",
        "Green onions (5 cal)"
      ],
      instructions: [
        "Brown ground beef",
        "Add sauce and vegetables",
        "Wash and separate lettuce leaves",
        "Fill leaves with mixture",
        "Garnish with green onions"
      ],
      prepTime: "15 minutes",
      cookTime: "15 minutes"
    }
  }
];
