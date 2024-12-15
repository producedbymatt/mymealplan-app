import { Meal } from "../../types";

export const otherProteinRecipes: Meal[] = [
  {
    name: "Turkey Meatballs with Zucchini Noodles",
    calories: 480,
    protein: 42,
    carbs: 20,
    fat: 28,
    recipe: {
      ingredients: [
        "6 oz ground turkey (280 cal)",
        "2 medium zucchini, spiralized (60 cal)",
        "1/2 cup marinara sauce (60 cal)",
        "1 oz parmesan cheese (110 cal)",
        "1 tbsp olive oil (120 cal)"
      ],
      instructions: [
        "Mix turkey with herbs and form meatballs",
        "Bake meatballs until cooked through",
        "Spiralize zucchini into noodles",
        "Sauté zucchini noodles in olive oil",
        "Top with meatballs, sauce, and cheese"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  },
  {
    name: "Pork Tenderloin with Roasted Vegetables",
    calories: 490,
    protein: 40,
    carbs: 35,
    fat: 23,
    recipe: {
      ingredients: [
        "6 oz pork tenderloin (280 cal)",
        "2 cups roasted vegetables (100 cal)",
        "1 medium sweet potato (120 cal)",
        "1 tbsp olive oil (120 cal)",
        "Herbs and spices (10 cal)"
      ],
      instructions: [
        "Season pork with herbs and spices",
        "Roast pork until cooked through",
        "Cut vegetables into equal sizes",
        "Roast vegetables with olive oil",
        "Let pork rest before slicing"
      ],
      prepTime: "10 minutes",
      cookTime: "25 minutes"
    }
  },
  // Add more protein recipes...
];