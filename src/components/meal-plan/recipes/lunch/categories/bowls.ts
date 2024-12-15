import { Meal } from "../../../types";

export const bowlLunchRecipes: Meal[] = [
  {
    name: "Burrito Bowl",
    calories: 550,
    protein: 32,
    carbs: 65,
    fat: 22,
    recipe: {
      ingredients: [
        "1 cup brown rice (220 cal)",
        "1 cup black beans (220 cal)",
        "4 oz grilled chicken (180 cal)",
        "1 cup lettuce (5 cal)",
        "1 medium avocado (240 cal)",
        "1 cup pico de gallo (25 cal)"
      ],
      instructions: [
        "Cook brown rice according to package instructions",
        "Heat black beans in a saucepan over medium heat, season with cumin and garlic powder",
        "Season chicken breast with taco seasoning",
        "Grill chicken for 6-7 minutes per side until internal temperature reaches 165°F",
        "Let chicken rest for 5 minutes, then slice into strips",
        "Chop lettuce into thin strips",
        "Slice avocado into wedges",
        "Layer rice in bowl",
        "Top with black beans, sliced chicken, lettuce, avocado, and pico de gallo",
        "Optional: serve with lime wedges and hot sauce"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Poke Bowl",
    calories: 480,
    protein: 35,
    carbs: 55,
    fat: 18,
    recipe: {
      ingredients: [
        "1 cup sushi rice (220 cal)",
        "6 oz sushi-grade tuna (180 cal)",
        "1 cup cucumber (8 cal)",
        "1 cup edamame (120 cal)",
        "1 medium avocado (240 cal)",
        "2 tbsp soy sauce (30 cal)"
      ],
      instructions: [
        "Rinse sushi rice until water runs clear",
        "Cook sushi rice according to package instructions",
        "Let rice cool to room temperature",
        "Cut tuna into 1-inch cubes",
        "Slice cucumber into thin half-moons",
        "Shell edamame if necessary",
        "Slice avocado into thin wedges",
        "Layer rice in bowl",
        "Arrange tuna, cucumber, edamame, and avocado on top of rice",
        "Drizzle with soy sauce and optional sriracha mayo"
      ],
      prepTime: "20 minutes",
      cookTime: "20 minutes"
    }
  }
];