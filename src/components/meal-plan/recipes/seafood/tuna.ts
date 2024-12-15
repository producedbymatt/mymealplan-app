import { Meal } from "../../types";

export const tunaRecipes: Meal[] = [
  {
    name: "Tuna Avocado Salad",
    calories: 455,
    protein: 35,
    carbs: 15,
    fat: 25,
    recipe: {
      ingredients: [
        "2 cans tuna in water, drained",
        "1 medium avocado",
        "0.25 cup red onion, diced",
        "0.5 tbsp olive oil",
        "1 tbsp lemon juice",
        "2 cups mixed greens",
        "0.5 cup cherry tomatoes"
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
  }
];