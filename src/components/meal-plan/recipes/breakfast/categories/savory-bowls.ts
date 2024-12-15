import { Meal } from "../../../types";

export const savoryBowls: Meal[] = [
  {
    name: "Sweet Potato Hash",
    calories: 440,
    protein: 20,
    carbs: 52,
    fat: 20,
    recipe: {
      ingredients: [
        "1 medium sweet potato (120 cal)",
        "2 eggs (140 cal)",
        "1/2 bell pepper (15 cal)",
        "1/4 onion (16 cal)",
        "2 tbsp olive oil (240 cal)",
        "Herbs and spices (5 cal)"
      ],
      instructions: [
        "Peel and dice 1 medium sweet potato into small, uniform cubes (about 1/2 inch)",
        "Dice 1/2 bell pepper and 1/4 onion into similar-sized pieces",
        "Heat 2 tablespoons olive oil in a large skillet over medium heat",
        "Add diced sweet potato to the skillet, season with salt and pepper",
        "Cook sweet potato for 10-12 minutes, stirring occasionally",
        "Add diced bell pepper and onion to the skillet",
        "Continue cooking for 5-6 minutes until vegetables are tender",
        "Create two wells in the vegetable mixture",
        "Crack one egg into each well",
        "Cover the skillet and cook for 3-4 minutes until eggs are set",
        "Season with additional herbs and spices to taste",
        "Serve immediately while hot"
      ],
      prepTime: "15 minutes",
      cookTime: "20 minutes"
    }
  }
];