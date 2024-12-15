import { Meal } from "../../types";

export const saladRecipes: Meal[] = [
  {
    name: "Mediterranean Salad",
    calories: 450,
    protein: 25,
    carbs: 35,
    fat: 28,
    recipe: {
      ingredients: [
        "2 cups mixed greens (10 cal)",
        "4 oz grilled chicken (180 cal)",
        "1/4 cup chickpeas (60 cal)",
        "2 oz feta cheese (150 cal)",
        "10 kalamata olives (100 cal)",
        "2 tbsp olive oil (240 cal)"
      ],
      instructions: [
        "Grill chicken and slice",
        "Combine all ingredients",
        "Toss with olive oil",
        "Season to taste"
      ],
      prepTime: "15 minutes",
      cookTime: "15 minutes"
    }
  }
];