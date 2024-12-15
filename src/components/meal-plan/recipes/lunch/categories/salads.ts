import { Meal } from "../../../types";

export const saladLunchRecipes: Meal[] = [
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
  },
  {
    name: "Asian Chicken Salad",
    calories: 450,
    protein: 35,
    carbs: 30,
    fat: 25,
    recipe: {
      ingredients: [
        "6 oz grilled chicken breast (180 cal)",
        "3 cups napa cabbage (15 cal)",
        "1 cup shredded carrots (50 cal)",
        "1/2 cup mandarin oranges (60 cal)",
        "1/4 cup sliced almonds (160 cal)",
        "2 tbsp sesame ginger dressing (120 cal)"
      ],
      instructions: [
        "Season chicken breast with salt and pepper",
        "Grill chicken for 6-7 minutes per side until internal temperature reaches 165°F",
        "Let chicken rest for 5 minutes, then slice thinly",
        "Shred napa cabbage and carrots",
        "Segment mandarin oranges if using fresh",
        "Toast almonds in a dry pan until fragrant",
        "Combine all ingredients in a large bowl",
        "Toss with sesame ginger dressing just before serving"
      ],
      prepTime: "15 minutes",
      cookTime: "15 minutes"
    }
  }
];
