import { Meal } from "../../../types";

export const asianChickenRecipes: Meal[] = [
  {
    name: "Chicken Teriyaki Bowl",
    calories: 525,
    protein: 42,
    carbs: 45,
    fat: 20,
    recipe: {
      ingredients: [
        "6 oz chicken breast (165 cal)",
        "1 cup brown rice (130 cal)",
        "1 cup mixed vegetables (50 cal)",
        "2 tbsp teriyaki sauce (60 cal)",
        "1 tbsp sesame oil (120 cal)",
        "1 tbsp minced ginger and garlic (10 cal)"
      ],
      instructions: [
        "Cook brown rice according to package instructions, then keep warm",
        "Cut chicken breast into 1-inch pieces",
        "Heat sesame oil in a large pan over medium-high heat",
        "Add minced ginger and garlic to the hot oil and sauté for 30 seconds until fragrant",
        "Add chicken pieces and cook until golden brown and cooked through, about 6-8 minutes",
        "Add mixed vegetables to the pan and stir-fry for 3-4 minutes until tender-crisp",
        "Pour teriyaki sauce over the chicken and vegetables, stirring to coat evenly",
        "Cook for 2 more minutes until the sauce is heated and slightly thickened",
        "Serve hot over the prepared brown rice"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Asian Sesame Chicken",
    calories: 510,
    protein: 43,
    carbs: 40,
    fat: 21,
    recipe: {
      ingredients: [
        "6 oz chicken breast (165 cal)",
        "1 cup brown rice (130 cal)",
        "2 cups broccoli (60 cal)",
        "2 tbsp sesame oil (120 cal)",
        "1 tbsp soy sauce (10 cal)",
        "1 tbsp honey (60 cal)",
        "1 tbsp sesame seeds (25 cal)"
      ],
      instructions: [
        "Cook brown rice according to package instructions, then keep warm",
        "Cut chicken breast into 1-inch pieces",
        "In a small bowl, mix soy sauce and honey to create the sauce",
        "Heat 1 tbsp sesame oil in a large pan over medium-high heat",
        "Add chicken pieces and cook until golden brown and cooked through, about 6-8 minutes",
        "Remove chicken from pan and set aside",
        "Add remaining sesame oil to the pan",
        "Add broccoli and stir-fry for 4-5 minutes until bright green and tender-crisp",
        "Return chicken to the pan and pour the sauce mixture over everything",
        "Cook for 2 more minutes, stirring to coat evenly",
        "Sprinkle sesame seeds over the dish and serve hot over rice"
      ],
      prepTime: "10 minutes",
      cookTime: "25 minutes"
    }
  }
];