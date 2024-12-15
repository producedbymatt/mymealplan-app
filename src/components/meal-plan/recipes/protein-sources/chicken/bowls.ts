import { Meal } from "../../../types";

export const chickenBowlRecipes: Meal[] = [
  {
    name: "Mediterranean Chicken Bowl",
    calories: 520,
    protein: 45,
    carbs: 30,
    fat: 22,
    recipe: {
      ingredients: [
        "6 oz chicken breast (165 cal)",
        "1 cup quinoa (220 cal)",
        "1 cup mixed vegetables (50 cal)",
        "1 tbsp olive oil (120 cal)",
        "2 tbsp hummus (70 cal)",
        "Fresh herbs (parsley, mint) (5 cal)"
      ],
      instructions: [
        "Rinse 1 cup quinoa thoroughly under cold water using a fine-mesh strainer",
        "Combine quinoa with 2 cups water in a medium saucepan",
        "Bring quinoa to a boil, then reduce heat to low and cover",
        "Simmer quinoa for 15-20 minutes until water is absorbed and quinoa is fluffy",
        "Meanwhile, pat 6 oz chicken breast dry with paper towels",
        "Season chicken with Mediterranean herbs, salt, and pepper",
        "Heat 1/2 tablespoon olive oil in a skillet over medium-high heat",
        "Cook chicken for 6-7 minutes per side until internal temperature reaches 165°F",
        "Let chicken rest for 5 minutes, then slice against the grain",
        "While chicken rests, toss mixed vegetables with remaining olive oil",
        "Season vegetables with salt, pepper, and Mediterranean herbs",
        "Roast vegetables in a 400°F oven for 15-20 minutes until tender",
        "Finely chop fresh parsley and mint",
        "Fluff quinoa with a fork and stir in half of the fresh herbs",
        "Assemble bowl: quinoa base, sliced chicken, roasted vegetables",
        "Top with a dollop of hummus and remaining fresh herbs"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  }
];