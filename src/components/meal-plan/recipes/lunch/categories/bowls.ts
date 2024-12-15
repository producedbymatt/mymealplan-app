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
    name: "Buddha Bowl",
    calories: 520,
    protein: 25,
    carbs: 65,
    fat: 22,
    recipe: {
      ingredients: [
        "1 cup quinoa (220 cal)",
        "1 cup roasted chickpeas (180 cal)",
        "1 cup roasted sweet potato (120 cal)",
        "2 cups mixed greens (10 cal)",
        "1 medium avocado (240 cal)",
        "2 tbsp tahini dressing (120 cal)"
      ],
      instructions: [
        "Rinse quinoa thoroughly and cook according to package instructions",
        "Drain and rinse chickpeas, pat dry, then toss with olive oil and seasonings",
        "Roast chickpeas at 400°F for 25-30 minutes until crispy",
        "Cut sweet potato into 1-inch cubes, toss with olive oil and seasonings",
        "Roast sweet potato at 400°F for 20-25 minutes until tender",
        "Prepare tahini dressing by mixing tahini, lemon juice, and water",
        "Layer quinoa, roasted vegetables, and greens in a bowl",
        "Top with sliced avocado and drizzle with tahini dressing"
      ],
      prepTime: "15 minutes",
      cookTime: "30 minutes"
    }
  },
  {
    name: "Teriyaki Tofu Bowl",
    calories: 480,
    protein: 22,
    carbs: 60,
    fat: 20,
    recipe: {
      ingredients: [
        "1 block firm tofu (240 cal)",
        "1 cup brown rice (220 cal)",
        "2 cups stir-fry vegetables (100 cal)",
        "3 tbsp teriyaki sauce (90 cal)",
        "1 tbsp sesame oil (120 cal)"
      ],
      instructions: [
        "Press tofu for 15 minutes to remove excess moisture",
        "Cook brown rice according to package instructions",
        "Cut tofu into 1-inch cubes",
        "Heat sesame oil in a large pan over medium-high heat",
        "Pan-fry tofu until golden brown on all sides, about 8-10 minutes",
        "Add vegetables to the pan and stir-fry for 3-4 minutes",
        "Pour teriyaki sauce over tofu and vegetables, cook for 2 more minutes",
        "Serve over brown rice and garnish with sesame seeds if desired"
      ],
      prepTime: "20 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Mediterranean Quinoa Bowl",
    calories: 510,
    protein: 28,
    carbs: 62,
    fat: 24,
    recipe: {
      ingredients: [
        "1 cup cooked quinoa (220 cal)",
        "4 oz grilled chicken breast (180 cal)",
        "1/2 cup roasted chickpeas (120 cal)",
        "1 cup mixed vegetables (50 cal)",
        "2 tbsp olive oil (240 cal)",
        "1/4 cup hummus (100 cal)"
      ],
      instructions: [
        "Cook quinoa according to package instructions",
        "Season chicken with Mediterranean herbs and grill until cooked through",
        "Roast chickpeas with olive oil and spices until crispy",
        "Steam or roast mixed vegetables",
        "Assemble bowl with quinoa as base",
        "Top with sliced chicken, chickpeas, and vegetables",
        "Drizzle with olive oil and add a dollop of hummus",
        "Garnish with fresh herbs if desired"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  },
  {
    name: "Asian Salmon Bowl",
    calories: 530,
    protein: 32,
    carbs: 55,
    fat: 26,
    recipe: {
      ingredients: [
        "4 oz salmon fillet (180 cal)",
        "1 cup brown rice (220 cal)",
        "1 cup stir-fried vegetables (100 cal)",
        "2 tbsp teriyaki sauce (90 cal)",
        "1 tbsp sesame oil (120 cal)",
        "1 tbsp sesame seeds (60 cal)"
      ],
      instructions: [
        "Cook brown rice according to package instructions",
        "Season salmon with salt and pepper",
        "Pan-sear salmon in sesame oil until cooked through",
        "Stir-fry mixed vegetables",
        "Assemble bowl with rice as base",
        "Top with salmon and vegetables",
        "Drizzle with teriyaki sauce",
        "Garnish with sesame seeds"
      ],
      prepTime: "10 minutes",
      cookTime: "20 minutes"
    }
  }
];
