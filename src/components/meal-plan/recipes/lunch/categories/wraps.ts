import { Meal } from "../../../types";

export const wrapLunchRecipes: Meal[] = [
  {
    name: "Greek Chicken Wrap",
    calories: 480,
    protein: 35,
    carbs: 45,
    fat: 22,
    recipe: {
      ingredients: [
        "1 large whole wheat wrap (120 cal)",
        "4 oz grilled chicken breast (180 cal)",
        "2 tbsp tzatziki sauce (45 cal)",
        "1 cup mixed greens (5 cal)",
        "1 medium tomato (22 cal)",
        "2 oz feta cheese (150 cal)",
        "10 kalamata olives (100 cal)"
      ],
      instructions: [
        "Season chicken breast with Greek seasoning",
        "Grill chicken for 6-7 minutes per side until internal temperature reaches 165°F",
        "Let chicken rest for 5 minutes, then slice into strips",
        "Warm wrap in a dry skillet over medium heat for 30 seconds per side",
        "Spread tzatziki sauce evenly on wrap",
        "Layer mixed greens in the center",
        "Add sliced chicken on top of greens",
        "Dice tomato and add to wrap",
        "Sprinkle crumbled feta cheese",
        "Add kalamata olives",
        "Fold in sides of wrap and roll tightly",
        "Cut diagonally and serve"
      ],
      prepTime: "15 minutes",
      cookTime: "15 minutes"
    }
  }
];