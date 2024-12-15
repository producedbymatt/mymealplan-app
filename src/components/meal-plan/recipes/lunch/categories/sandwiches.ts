import { Meal } from "../../../types";

export const sandwichLunchRecipes: Meal[] = [
  {
    name: "Turkey Avocado Wrap",
    calories: 480,
    protein: 35,
    carbs: 40,
    fat: 22,
    recipe: {
      ingredients: [
        "2 slices turkey breast (100 cal)",
        "1 whole wheat wrap (120 cal)",
        "1 medium avocado (160 cal)",
        "1 cup mixed greens (10 cal)",
        "2 tbsp hummus (70 cal)"
      ],
      instructions: [
        "Warm the whole wheat wrap in a dry skillet over medium heat for 30 seconds per side",
        "Spread hummus evenly across the entire surface of the wrap",
        "Layer turkey breast slices in the center of the wrap",
        "Slice the avocado and arrange the slices over the turkey",
        "Add a layer of mixed greens on top",
        "Fold in both sides of the wrap, then roll from bottom to top, keeping ingredients tight",
        "Cut diagonally in half and serve immediately"
      ],
      prepTime: "10 minutes",
      cookTime: "0 minutes"
    }
  }
];