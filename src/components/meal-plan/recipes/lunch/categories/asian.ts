import { Meal } from "../../../types";

export const asianLunchRecipes: Meal[] = [
  {
    name: "Asian Noodle Bowl",
    calories: 520,
    protein: 28,
    carbs: 65,
    fat: 18,
    recipe: {
      ingredients: [
        "2 cups rice noodles (220 cal)",
        "4 oz tofu (160 cal)",
        "1 cup mixed vegetables (50 cal)",
        "2 tbsp peanut sauce (120 cal)",
        "1 tbsp sesame oil (120 cal)"
      ],
      instructions: [
        "Boil water and cook rice noodles according to package instructions, then drain and set aside",
        "Cut tofu into 1-inch cubes and pat dry with paper towels",
        "Heat sesame oil in a large pan over medium-high heat",
        "Pan-fry tofu cubes for 3-4 minutes per side until golden brown and crispy",
        "Add mixed vegetables to the same pan and stir-fry for 2-3 minutes until crisp-tender",
        "Return noodles to the pan and add peanut sauce, stirring to coat everything evenly",
        "Cook for an additional 1-2 minutes until everything is hot and well combined",
        "Serve immediately while hot"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  }
];