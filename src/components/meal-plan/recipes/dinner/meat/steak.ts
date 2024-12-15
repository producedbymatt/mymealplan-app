import { Meal } from "../../../types";

export const steakRecipes: Meal[] = [
  {
    name: "Pepper-Crusted Ribeye Steak",
    calories: 550,
    protein: 48,
    carbs: 15,
    fat: 35,
    recipe: {
      ingredients: [
        "8 oz ribeye steak (450 cal)",
        "2 tbsp black peppercorns (10 cal)",
        "1 tbsp olive oil (120 cal)",
        "1 cup roasted vegetables (50 cal)",
        "Fresh herbs (5 cal)"
      ],
      instructions: [
        "Crush peppercorns and coat steak",
        "Heat oil in cast iron skillet",
        "Cook steak to desired doneness",
        "Let rest for 5-10 minutes",
        "Serve with roasted vegetables"
      ],
      prepTime: "10 minutes",
      cookTime: "15 minutes"
    }
  },
  {
    name: "Asian-Style Flank Steak",
    calories: 520,
    protein: 45,
    carbs: 25,
    fat: 28,
    recipe: {
      ingredients: [
        "7 oz flank steak (350 cal)",
        "2 tbsp soy sauce (20 cal)",
        "1 tbsp sesame oil (120 cal)",
        "1 cup brown rice (220 cal)",
        "1 cup stir-fried vegetables (50 cal)",
        "Ginger and garlic (10 cal)"
      ],
      instructions: [
        "Marinate steak in soy sauce and spices",
        "Grill or pan-sear steak",
        "Cook rice according to package",
        "Stir-fry vegetables",
        "Slice steak against the grain"
      ],
      prepTime: "20 minutes",
      cookTime: "20 minutes"
    }
  },
  {
    name: "Sirloin Steak with Sweet Potato",
    calories: 530,
    protein: 46,
    carbs: 30,
    fat: 26,
    recipe: {
      ingredients: [
        "7 oz sirloin steak (350 cal)",
        "1 medium sweet potato (120 cal)",
        "2 cups spinach (14 cal)",
        "1 tbsp olive oil (120 cal)",
        "Herbs and seasonings (10 cal)"
      ],
      instructions: [
        "Season steak with herbs and spices",
        "Cook steak to desired doneness",
        "Roast sweet potato wedges",
        "Sauté spinach",
        "Serve together"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  }
];