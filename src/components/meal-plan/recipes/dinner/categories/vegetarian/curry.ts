import { Meal } from "../../../../types";

export const curryRecipes: Meal[] = [
  {
    name: "Vegetable Curry",
    calories: 420,
    protein: 18,
    carbs: 52,
    fat: 20,
    recipe: {
      ingredients: [
        "2 cups mixed vegetables (100 cal)",
        "1 cup chickpeas (220 cal)",
        "1/2 cup coconut milk (120 cal)",
        "1 cup brown rice (220 cal)",
        "Curry spices (10 cal)"
      ],
      instructions: [
        "Cook rice",
        "Prepare curry sauce",
        "Add vegetables",
        "Simmer until done",
        "Serve over rice"
      ],
      prepTime: "20 minutes",
      cookTime: "30 minutes"
    }
  }
];