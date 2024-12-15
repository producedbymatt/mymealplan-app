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
        "Season chicken breast with salt and pepper, then grill for 6-7 minutes per side until internal temperature reaches 165°F",
        "Let chicken rest for 5 minutes, then slice into thin strips",
        "Wash and dry mixed greens, then place in a large serving bowl",
        "Drain and rinse chickpeas, then add to the bowl",
        "Add sliced grilled chicken on top of the greens",
        "Crumble feta cheese over the salad",
        "Arrange kalamata olives around the bowl",
        "Drizzle olive oil evenly over all ingredients just before serving",
        "Toss gently to combine all ingredients"
      ],
      prepTime: "15 minutes",
      cookTime: "15 minutes"
    }
  }
];