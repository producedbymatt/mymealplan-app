import { Meal } from "../../types";

export const pokeRecipes: Meal[] = [
  {
    name: "Poke Bowl",
    calories: 470,
    protein: 35,
    carbs: 40,
    fat: 20,
    recipe: {
      ingredients: [
        "6 oz sushi-grade tuna",
        "1 cup brown rice",
        "1 avocado",
        "Cucumber",
        "Seaweed",
        "Soy sauce",
        "Sesame oil"
      ],
      instructions: [
        "Cook brown rice",
        "Cube tuna",
        "Slice vegetables",
        "Make sauce",
        "Assemble bowl"
      ],
      prepTime: "20 minutes",
      cookTime: "25 minutes"
    }
  }
];