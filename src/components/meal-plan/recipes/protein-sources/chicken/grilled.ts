import { Meal } from "../../../types";

export const grilledChickenRecipes: Meal[] = [
  {
    name: "Lemon Herb Grilled Chicken",
    calories: 450,
    protein: 45,
    carbs: 20,
    fat: 22,
    recipe: {
      ingredients: [
        "8 oz chicken breast (220 cal)",
        "1 tbsp olive oil (120 cal)",
        "2 cups mixed vegetables (100 cal)",
        "1 lemon (10 cal)",
        "2 tbsp fresh herbs (parsley, thyme, rosemary) (5 cal)"
      ],
      instructions: [
        "Pat 8 oz chicken breast dry with paper towels",
        "In a bowl, combine 1 tablespoon olive oil, juice of half a lemon, and finely chopped fresh herbs",
        "Place chicken in the marinade, coating evenly on all sides",
        "Let chicken marinate for at least 30 minutes in the refrigerator",
        "Preheat grill to medium-high heat (around 375-450°F)",
        "While grill heats, cut remaining half lemon into wedges for serving",
        "Remove chicken from marinade and discard remaining marinade",
        "Place chicken on preheated grill",
        "Grill for 6-7 minutes on first side until golden with grill marks",
        "Flip chicken and grill additional 5-6 minutes until internal temperature reaches 165°F",
        "While chicken cooks, toss mixed vegetables with olive oil and seasonings",
        "Place vegetables in a grill basket or on foil",
        "Grill vegetables for 8-10 minutes, stirring occasionally",
        "Remove chicken from grill and let rest for 5 minutes",
        "Serve chicken with grilled vegetables and lemon wedges"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  }
];