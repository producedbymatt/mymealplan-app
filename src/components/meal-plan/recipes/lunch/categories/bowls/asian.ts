import { Meal } from "../../../../types";

export const asianBowlRecipes: Meal[] = [
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
        "Cook rice noodles according to package instructions, then drain and set aside",
        "Heat sesame oil in a large pan over medium heat",
        "Cut tofu into 1-inch cubes and pan-fry in the heated sesame oil until crispy on all sides, about 8-10 minutes",
        "Add mixed vegetables to the same pan and stir-fry until tender-crisp, about 3-5 minutes",
        "Return noodles to the pan and toss with the tofu and vegetables",
        "Pour peanut sauce over everything and toss until well combined and heated through",
        "Serve hot, garnished with sesame seeds if desired"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  }
];