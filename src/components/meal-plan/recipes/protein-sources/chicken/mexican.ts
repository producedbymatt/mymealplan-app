import { Meal } from "../../../types";

export const mexicanChickenRecipes: Meal[] = [
  {
    name: "Chicken Fajita Bowl",
    calories: 490,
    protein: 42,
    carbs: 38,
    fat: 20,
    recipe: {
      ingredients: [
        "6 oz chicken breast (165 cal)",
        "1 bell pepper (30 cal)",
        "1 onion (40 cal)",
        "1 cup brown rice (130 cal)",
        "1 tbsp olive oil (120 cal)",
        "1 oz cheese (110 cal)",
        "Fajita seasoning (5 cal)"
      ],
      instructions: [
        "Cook brown rice",
        "Slice chicken, peppers, and onions",
        "Season with fajita spices",
        "Sauté vegetables",
        "Cook chicken until done",
        "Assemble bowl and top with cheese"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  }
];