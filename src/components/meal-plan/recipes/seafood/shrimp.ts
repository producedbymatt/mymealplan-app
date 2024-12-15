import { Meal } from "../../types";

export const shrimpRecipes: Meal[] = [
  {
    name: "Shrimp and Cauliflower Rice Bowl",
    calories: 410,
    protein: 35,
    carbs: 25,
    fat: 22,
    recipe: {
      ingredients: [
        "8 oz shrimp",
        "2 cups cauliflower rice",
        "1 cup mixed vegetables",
        "1 tbsp coconut oil",
        "Garlic and ginger"
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
    name: "Garlic Shrimp Pasta",
    calories: 520,
    protein: 35,
    carbs: 45,
    fat: 22,
    recipe: {
      ingredients: [
        "6 oz shrimp",
        "2 oz whole grain pasta",
        "2 cups vegetables",
        "1 tbsp olive oil",
        "Garlic and herbs",
        "Parmesan cheese"
      ],
      instructions: [
        "Cook pasta al dente",
        "Sauté garlic and vegetables",
        "Cook shrimp until pink",
        "Combine all ingredients",
        "Top with parmesan"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  }
];