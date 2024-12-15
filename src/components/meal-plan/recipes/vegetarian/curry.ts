import { Meal } from "../../types";

export const vegetarianCurry: Meal[] = [
  {
    name: "Lentil Curry Bowl",
    calories: 480,
    protein: 25,
    carbs: 55,
    fat: 18,
    recipe: {
      ingredients: [
        "1 cup red lentils",
        "1 cup brown rice",
        "1 cup spinach",
        "1 tbsp coconut oil",
        "Curry spices",
        "Coconut milk"
      ],
      instructions: [
        "Cook lentils with spices",
        "Prepare brown rice",
        "Add coconut milk to lentils",
        "Wilt spinach",
        "Combine in bowl"
      ],
      prepTime: "10 minutes",
      cookTime: "25 minutes"
    }
  }
];