import { Meal } from "../../../../types";

export const asianBowlRecipes: Meal[] = [
  {
    name: "Asian Noodle Bowl",
    calories: 520,
    protein: 28,
    carbs: 65,
    fat: 18,
    recipe: {
      ingredients: [
        "2 cups rice noodles (220 cal)",
        "4 oz tofu (160 cal)",
        "1 cup mixed vegetables (50 cal)",
        "2 tbsp peanut sauce (120 cal)",
        "1 tbsp sesame oil (120 cal)"
      ],
      instructions: [
        "Cook noodles according to package",
        "Pan-fry tofu until crispy",
        "Stir-fry vegetables",
        "Combine with sauce",
        "Top with sesame seeds"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  }
];