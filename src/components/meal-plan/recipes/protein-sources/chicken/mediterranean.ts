import { Meal } from "../../../types";

export const mediterraneanChickenRecipes: Meal[] = [
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
        "Fresh herbs (5 cal)"
      ],
      instructions: [
        "Cook quinoa according to package instructions",
        "Season chicken with Mediterranean herbs",
        "Grill chicken until cooked through",
        "Roast vegetables with olive oil",
        "Assemble bowl and top with hummus"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Greek Chicken Salad",
    calories: 470,
    protein: 45,
    carbs: 20,
    fat: 25,
    recipe: {
      ingredients: [
        "6 oz chicken breast (165 cal)",
        "2 cups mixed greens (10 cal)",
        "1/2 cucumber (8 cal)",
        "10 kalamata olives (100 cal)",
        "2 oz feta cheese (150 cal)",
        "1 tbsp olive oil (120 cal)",
        "Red wine vinegar (5 cal)"
      ],
      instructions: [
        "Grill chicken with Greek seasoning",
        "Chop vegetables",
        "Mix olive oil and vinegar",
        "Combine all ingredients",
        "Top with feta cheese"
      ],
      prepTime: "15 minutes",
      cookTime: "15 minutes"
    }
  }
];