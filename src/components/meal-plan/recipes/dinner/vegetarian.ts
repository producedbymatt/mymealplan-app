import { Meal } from "../../../types";

export const vegetarianDinnerRecipes: Meal[] = [
  {
    name: "Chickpea and Sweet Potato Curry",
    calories: 420,
    protein: 15,
    carbs: 65,
    fat: 12,
    recipe: {
      ingredients: [
        "1 can chickpeas (200 cal)",
        "1 sweet potato (120 cal)",
        "1 cup coconut milk (50 cal)",
        "1 tbsp curry powder (10 cal)",
        "1 cup brown rice (220 cal)"
      ],
      instructions: [
        "Dice sweet potato",
        "Cook rice according to package",
        "Simmer chickpeas and sweet potato in coconut milk",
        "Add curry powder",
        "Serve over rice"
      ],
      prepTime: "10 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Vegetable Stir-Fry",
    calories: 420,
    protein: 18,
    carbs: 58,
    fat: 15,
    recipe: {
      ingredients: [
        "14 oz tofu (280 cal)",
        "2 cups mixed vegetables (100 cal)",
        "1 cup brown rice (220 cal)",
        "2 tbsp soy sauce (20 cal)",
        "1 tbsp sesame oil (120 cal)"
      ],
      instructions: [
        "Press and cube tofu",
        "Cook rice",
        "Stir-fry vegetables",
        "Add tofu and sauce",
        "Serve over rice"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  },
  {
    name: "Vegetable Lasagna",
    calories: 480,
    protein: 22,
    carbs: 65,
    fat: 18,
    recipe: {
      ingredients: [
        "Lasagna noodles (200 cal)",
        "Ricotta cheese (180 cal)",
        "Spinach (20 cal)",
        "Marinara sauce (80 cal)",
        "Mozzarella cheese (160 cal)"
      ],
      instructions: [
        "Layer noodles",
        "Add ricotta and spinach",
        "Add sauce",
        "Top with mozzarella",
        "Bake until bubbly"
      ],
      prepTime: "20 minutes",
      cookTime: "45 minutes"
    }
  },
  {
    name: "Quinoa Buddha Bowl",
    calories: 420,
    protein: 18,
    carbs: 62,
    fat: 14,
    recipe: {
      ingredients: [
        "1 cup quinoa (220 cal)",
        "1 cup roasted vegetables (100 cal)",
        "1/2 avocado (160 cal)",
        "2 tbsp tahini (180 cal)",
        "Fresh herbs (5 cal)"
      ],
      instructions: [
        "Cook quinoa",
        "Roast vegetables",
        "Make tahini sauce",
        "Slice avocado",
        "Assemble bowl"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  },
  {
    name: "Mushroom Risotto",
    calories: 450,
    protein: 12,
    carbs: 65,
    fat: 16,
    recipe: {
      ingredients: [
        "1.5 cups arborio rice (300 cal)",
        "2 cups mushrooms (50 cal)",
        "1/2 cup parmesan cheese (215 cal)",
        "1 tbsp olive oil (120 cal)",
        "4 cups vegetable broth (40 cal)",
        "1 onion (40 cal)"
      ],
      instructions: [
        "Sauté mushrooms and onions",
        "Add rice and toast lightly",
        "Gradually add warm broth",
        "Stir until creamy",
        "Finish with parmesan"
      ],
      prepTime: "15 minutes",
      cookTime: "30 minutes"
    }
  }
];