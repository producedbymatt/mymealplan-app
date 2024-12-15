import { Meal } from "../../types";

export const vegetarianDinnerRecipes: Meal[] = [
  {
    name: "Chickpea and Sweet Potato Curry",
    calories: 420,
    protein: 20,
    carbs: 52,
    fat: 18,
    recipe: {
      ingredients: [
        "2 cups chickpeas (400 cal)",
        "1 cup brown rice (220 cal)",
        "1 sweet potato, cubed (120 cal)",
        "2 tbsp coconut oil (120 cal)",
        "Curry spices (10 cal)"
      ],
      instructions: [
        "Cook rice",
        "Roast sweet potato",
        "Prepare curry sauce",
        "Combine ingredients",
        "Simmer until done"
      ],
      prepTime: "20 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Vegetable Stir-Fry",
    calories: 420,
    protein: 20,
    carbs: 52,
    fat: 18,
    recipe: {
      ingredients: [
        "2 cups mixed vegetables (100 cal)",
        "1 cup brown rice (220 cal)",
        "4 oz tofu (160 cal)",
        "2 tbsp soy sauce (20 cal)",
        "1 tbsp sesame oil (120 cal)"
      ],
      instructions: [
        "Cook rice",
        "Press and cube tofu",
        "Stir-fry vegetables",
        "Add sauce",
        "Serve over rice"
      ],
      prepTime: "20 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Vegetable Lasagna",
    calories: 480,
    protein: 24,
    carbs: 52,
    fat: 22,
    recipe: {
      ingredients: [
        "2 lasagna noodles (220 cal)",
        "1 cup ricotta cheese (220 cal)",
        "1 cup marinara sauce (120 cal)",
        "1 cup spinach (7 cal)",
        "1 oz mozzarella (80 cal)"
      ],
      instructions: [
        "Cook noodles",
        "Layer ingredients",
        "Add sauce and cheese",
        "Bake until bubbly",
        "Let rest before serving"
      ],
      prepTime: "25 minutes",
      cookTime: "45 minutes"
    }
  },
  {
    name: "Quinoa Buddha Bowl",
    calories: 420,
    protein: 22,
    carbs: 52,
    fat: 18,
    recipe: {
      ingredients: [
        "1 cup quinoa (220 cal)",
        "1 cup chickpeas (220 cal)",
        "1 cup roasted vegetables (50 cal)",
        "1/4 avocado (80 cal)",
        "1 tbsp tahini (100 cal)"
      ],
      instructions: [
        "Cook quinoa",
        "Roast vegetables",
        "Heat chickpeas",
        "Make tahini sauce",
        "Assemble bowl"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  }
];
