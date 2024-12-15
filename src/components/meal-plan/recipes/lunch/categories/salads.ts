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
        "Prepare all ingredients",
        "Combine in a bowl",
        "Drizzle with olive oil",
        "Toss and serve"
      ],
      prepTime: "15 minutes",
      cookTime: "0 minutes"
    }
  },
  {
    name: "Cobb Salad",
    calories: 520,
    protein: 35,
    carbs: 20,
    fat: 35,
    recipe: {
      ingredients: [
        "2 cups romaine lettuce (10 cal)",
        "4 oz grilled chicken (180 cal)",
        "2 eggs (140 cal)",
        "2 strips bacon (80 cal)",
        "1/2 avocado (160 cal)",
        "2 tbsp blue cheese (100 cal)"
      ],
      instructions: [
        "Chop lettuce and arrange in bowl",
        "Add toppings in rows",
        "Serve with dressing on side"
      ],
      prepTime: "20 minutes",
      cookTime: "15 minutes"
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
  },
  {
    name: "Southwest Chicken Salad",
    calories: 490,
    protein: 35,
    carbs: 30,
    fat: 28,
    recipe: {
      ingredients: [
        "4 oz grilled chicken breast (180 cal)",
        "2 cups romaine lettuce (10 cal)",
        "1/2 cup black beans (110 cal)",
        "1/2 cup corn (80 cal)",
        "1/2 avocado (120 cal)",
        "2 tbsp ranch dressing (140 cal)"
      ],
      instructions: [
        "Season chicken with southwest spices and grill until cooked",
        "Chop romaine lettuce",
        "Rinse and drain black beans",
        "Combine all ingredients in a large bowl",
        "Top with sliced chicken and avocado",
        "Drizzle with ranch dressing",
        "Toss gently before serving"
      ],
      prepTime: "15 minutes",
      cookTime: "15 minutes"
    }
  },
  {
    name: "Quinoa Tabbouleh Salad",
    calories: 460,
    protein: 18,
    carbs: 52,
    fat: 24,
    recipe: {
      ingredients: [
        "1 cup cooked quinoa (220 cal)",
        "2 cups parsley (10 cal)",
        "1 cup cherry tomatoes (27 cal)",
        "1/2 cup cucumber (8 cal)",
        "1/4 cup mint leaves (5 cal)",
        "3 tbsp olive oil (360 cal)",
        "1 lemon, juiced (20 cal)"
      ],
      instructions: [
        "Cook quinoa according to package instructions and let cool",
        "Finely chop parsley and mint",
        "Dice cucumber and halve cherry tomatoes",
        "Combine all ingredients in a large bowl",
        "Add olive oil and lemon juice",
        "Season with salt and pepper",
        "Toss well and chill before serving"
      ],
      prepTime: "20 minutes",
      cookTime: "15 minutes"
    }
  }
];
