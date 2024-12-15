import { Meal } from "../../../types";
import { grilledFishRecipes } from "./grilled-fish";

export const fishRecipes: Meal[] = [
  ...grilledFishRecipes,
  {
    name: "Tuna Avocado Salad",
    calories: 455,
    protein: 35,
    carbs: 15,
    fat: 25,
    recipe: {
      ingredients: [
        "2 cans tuna in water, drained (240 cal)",
        "1 medium avocado (160 cal)",
        "1/4 cup red onion, diced (15 cal)",
        "0.5 tbsp olive oil (60 cal)",
        "1 tbsp lemon juice (5 cal)",
        "2 cups mixed greens (10 cal)",
        "1/2 cup cherry tomatoes (25 cal)"
      ],
      instructions: [
        "Drain the tuna and place it in a mixing bowl, breaking it up with a fork.",
        "Cut the avocado in half, remove the pit, and scoop the flesh into the bowl with the tuna.",
        "Add diced red onion, olive oil, and lemon juice to the bowl.",
        "Gently mix all ingredients together until well combined, being careful not to mash the avocado too much.",
        "Season with salt and pepper to taste.",
        "Serve the tuna avocado mixture over a bed of mixed greens.",
        "Halve the cherry tomatoes and scatter them on top of the salad before serving."
      ],
      prepTime: "10 minutes",
      cookTime: "0 minutes"
    }
  },
  {
    name: "Shrimp and Cauliflower Rice Bowl",
    calories: 410,
    protein: 35,
    carbs: 25,
    fat: 22,
    recipe: {
      ingredients: [
        "8 oz shrimp (240 cal)",
        "2 cups cauliflower rice (50 cal)",
        "1 cup mixed vegetables (50 cal)",
        "1 tbsp coconut oil (120 cal)",
        "Garlic and ginger (10 cal)"
      ],
      instructions: [
        "Peel and devein the shrimp, then season with salt and pepper.",
        "Heat coconut oil in a large skillet over medium heat.",
        "Add minced garlic and ginger to the skillet and sauté for 1-2 minutes until fragrant.",
        "Add the shrimp to the skillet and cook for 3-4 minutes until they turn pink and opaque.",
        "Remove the shrimp from the skillet and set aside.",
        "In the same skillet, add cauliflower rice and mixed vegetables, stirring to combine.",
        "Cook for 5-7 minutes until the vegetables are tender and the cauliflower rice is heated through.",
        "Return the shrimp to the skillet, mixing everything together.",
        "Serve hot, garnished with additional herbs if desired."
      ],
      prepTime: "15 minutes",
      cookTime: "15 minutes"
    }
  },
  {
    name: "Garlic Shrimp Pasta",
    calories: 520,
    protein: 35,
    carbs: 45,
    fat: 22,
    recipe: {
      ingredients: [
        "6 oz shrimp (180 cal)",
        "2 oz whole grain pasta (200 cal)",
        "2 cups vegetables (100 cal)",
        "1 tbsp olive oil (120 cal)",
        "Garlic and herbs (10 cal)",
        "Parmesan cheese (60 cal)"
      ],
      instructions: [
        "Cook the pasta according to package instructions until al dente, then drain and set aside.",
        "In a large skillet, heat olive oil over medium heat.",
        "Add minced garlic and sauté for 1-2 minutes until fragrant.",
        "Add the shrimp to the skillet and cook for 3-4 minutes until they turn pink.",
        "Add the vegetables to the skillet and stir-fry for an additional 3-4 minutes until tender.",
        "Combine the cooked pasta with the shrimp and vegetables in the skillet, tossing to mix well.",
        "Season with salt, pepper, and herbs to taste.",
        "Serve hot, topped with grated Parmesan cheese."
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  },
  {
    name: "Cajun Seafood Bowl",
    calories: 490,
    protein: 40,
    carbs: 35,
    fat: 23,
    recipe: {
      ingredients: [
        "4 oz shrimp (120 cal)",
        "2 oz white fish (60 cal)",
        "1 cup cauliflower rice (25 cal)",
        "1 cup vegetables (50 cal)",
        "1 tbsp olive oil (120 cal)",
        "Cajun seasoning (15 cal)",
        "Lemon (20 cal)"
      ],
      instructions: [
        "Season the shrimp and white fish with Cajun seasoning.",
        "Heat olive oil in a skillet over medium heat.",
        "Add the seasoned shrimp and fish to the skillet and cook for 3-4 minutes until cooked through.",
        "Remove the seafood from the skillet and set aside.",
        "In the same skillet, add cauliflower rice and mixed vegetables, cooking for 5-7 minutes until tender.",
        "Return the seafood to the skillet, mixing everything together.",
        "Serve hot with lemon wedges on the side."
      ],
      prepTime: "15 minutes",
      cookTime: "15 minutes"
    }
  },
  {
    name: "Poke Bowl",
    calories: 470,
    protein: 35,
    carbs: 40,
    fat: 20,
    recipe: {
      ingredients: [
        "6 oz sushi-grade tuna (180 cal)",
        "1 cup brown rice (130 cal)",
        "1 avocado (120 cal)",
        "Cucumber (8 cal)",
        "Seaweed (10 cal)",
        "Soy sauce (10 cal)",
        "Sesame oil (60 cal)"
      ],
      instructions: [
        "Cook brown rice according to package instructions and let it cool slightly.",
        "Cube the sushi-grade tuna and place it in a bowl.",
        "Slice the avocado and cucumber into thin slices.",
        "In a serving bowl, layer the brown rice, followed by the cubed tuna, avocado slices, and cucumber.",
        "Top with seaweed, a drizzle of soy sauce, and sesame oil.",
        "Serve immediately, garnished with additional toppings if desired."
      ],
      prepTime: "20 minutes",
      cookTime: "25 minutes"
    }
  }
];
