import { Meal } from "../../../../types";

export const stirFryRecipes: Meal[] = [
  {
    name: "Tofu Stir-Fry",
    calories: 420,
    protein: 20,
    carbs: 52,
    fat: 18,
    recipe: {
      ingredients: [
        "2 cups mixed vegetables (100 cal)",
        "1 cup tofu (160 cal)",
        "2 tbsp soy sauce (20 cal)",
        "1 tbsp sesame oil (120 cal)",
        "1 cup brown rice (220 cal)"
      ],
      instructions: [
        "Press and cube tofu",
        "Stir-fry vegetables",
        "Add sauce",
        "Cook tofu until crispy",
        "Serve over rice"
      ],
      prepTime: "20 minutes",
      cookTime: "25 minutes"
    }
  }
];