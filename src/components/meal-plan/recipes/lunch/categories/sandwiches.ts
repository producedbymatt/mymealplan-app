import { Meal } from "../../../types";

export const sandwichLunchRecipes: Meal[] = [
  {
    name: "Caprese Sandwich",
    calories: 450,
    protein: 20,
    carbs: 48,
    fat: 22,
    recipe: {
      ingredients: [
        "2 slices sourdough bread (220 cal)",
        "4 oz fresh mozzarella (280 cal)",
        "2 medium tomatoes (44 cal)",
        "1 cup fresh basil leaves (1 cal)",
        "2 tbsp balsamic glaze (40 cal)",
        "1 tbsp olive oil (120 cal)"
      ],
      instructions: [
        "Slice tomatoes into 1/4 inch thick rounds",
        "Slice mozzarella into 1/4 inch thick slices",
        "Wash and dry basil leaves",
        "Lightly toast sourdough bread slices",
        "Drizzle olive oil on both inner sides of bread",
        "Layer mozzarella slices on one piece of bread",
        "Add tomato slices on top of mozzarella",
        "Place basil leaves over tomatoes",
        "Drizzle with balsamic glaze",
        "Close sandwich with other bread slice",
        "Cut diagonally and serve immediately"
      ],
      prepTime: "10 minutes",
      cookTime: "5 minutes"
    }
  }
];