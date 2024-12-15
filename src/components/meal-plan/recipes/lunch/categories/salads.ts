import { Meal } from "../../../types";

export const saladLunchRecipes: Meal[] = [
  {
    name: "Quinoa Power Bowl",
    calories: 450,
    protein: 25,
    carbs: 48,
    fat: 22,
    recipe: {
      ingredients: [
        "1 cup cooked quinoa (220 cal)",
        "4 oz grilled chicken breast (180 cal)",
        "1 cup mixed greens (10 cal)",
        "1 medium avocado (240 cal)",
        "2 tbsp olive oil (240 cal)",
        "1 cup cherry tomatoes (27 cal)"
      ],
      instructions: [
        "Cook quinoa according to package instructions until fluffy and tender",
        "Season chicken breast with salt and pepper",
        "Grill chicken breast for 6-7 minutes per side until internal temperature reaches 165°F",
        "Let chicken rest for 5 minutes, then slice into thin strips",
        "Wash and dry mixed greens",
        "Slice avocado into thin wedges",
        "Halve cherry tomatoes",
        "Layer quinoa in bowl",
        "Top with sliced chicken, mixed greens, avocado, and tomatoes",
        "Drizzle with olive oil and season with salt and pepper to taste"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Cobb Salad",
    calories: 520,
    protein: 35,
    carbs: 15,
    fat: 38,
    recipe: {
      ingredients: [
        "3 cups romaine lettuce (15 cal)",
        "4 oz grilled chicken breast (180 cal)",
        "2 hard-boiled eggs (140 cal)",
        "4 strips bacon, cooked and crumbled (180 cal)",
        "1 medium avocado (240 cal)",
        "2 oz blue cheese (200 cal)",
        "1 cup cherry tomatoes (27 cal)"
      ],
      instructions: [
        "Wash and chop romaine lettuce into bite-sized pieces",
        "Grill chicken breast for 6-7 minutes per side until cooked through",
        "Let chicken rest for 5 minutes, then slice into strips",
        "Cook bacon until crispy, then crumble into pieces",
        "Boil eggs for 8 minutes, then peel and quarter them",
        "Slice avocado into wedges",
        "Halve cherry tomatoes",
        "Arrange lettuce in a large bowl",
        "Section ingredients in rows over lettuce: chicken, eggs, bacon, avocado, blue cheese, and tomatoes",
        "Serve with your preferred dressing on the side"
      ],
      prepTime: "20 minutes",
      cookTime: "25 minutes"
    }
  }
];