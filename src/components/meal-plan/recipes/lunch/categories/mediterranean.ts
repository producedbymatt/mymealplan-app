import { Meal } from "../../../types";

export const mediterraneanLunchRecipes: Meal[] = [
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
        "Pat chicken breast dry with paper towels",
        "Season chicken with 1 tsp each of dried oregano, salt, and black pepper",
        "Heat grill or grill pan over medium-high heat",
        "Grill chicken for 6-7 minutes per side until internal temperature reaches 165°F",
        "While chicken cooks, thoroughly wash and dry mixed greens",
        "Drain and rinse chickpeas, pat dry with paper towels",
        "Slice kalamata olives in half if desired",
        "Let chicken rest for 5 minutes after cooking",
        "Slice chicken against the grain into thin strips",
        "In a large serving bowl, arrange mixed greens as the base",
        "Add chickpeas in a section of the bowl",
        "Arrange sliced grilled chicken in another section",
        "Crumble feta cheese over the entire salad",
        "Place kalamata olives around the bowl",
        "Just before serving, drizzle olive oil evenly over all ingredients",
        "Optional: add fresh cracked black pepper and dried oregano",
        "Toss gently to combine all ingredients when ready to eat"
      ],
      prepTime: "15 minutes",
      cookTime: "15 minutes"
    }
  }
];