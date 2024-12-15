import { Meal } from "../../../../types";

export const stirFryRecipes: Meal[] = [
  {
    name: "Tofu Stir-Fry",
    calories: 420,
    protein: 20,
    carbs: 52,
    fat: 18,
    recipe: {
      ingredients: [
        "2 cups mixed vegetables (100 cal)",
        "1 cup tofu (160 cal)",
        "2 tbsp soy sauce (20 cal)",
        "1 tbsp sesame oil (120 cal)",
        "1 cup brown rice (220 cal)"
      ],
      instructions: [
        "Cook brown rice according to package instructions, then keep warm",
        "Press tofu between paper towels for 15 minutes to remove excess moisture",
        "Cut pressed tofu into 1-inch cubes",
        "Heat sesame oil in a large wok or pan over medium-high heat",
        "Add tofu cubes and cook until golden brown on all sides, about 5-7 minutes",
        "Add mixed vegetables to the pan and stir-fry for 3-4 minutes until crisp-tender",
        "Pour soy sauce over the tofu and vegetables, stirring to coat evenly",
        "Cook for an additional 2 minutes until everything is well heated",
        "Serve hot over the prepared brown rice"
      ],
      prepTime: "20 minutes",
      cookTime: "25 minutes"
    }
  }
];