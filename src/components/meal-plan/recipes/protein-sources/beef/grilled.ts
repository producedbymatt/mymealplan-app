import { Meal } from "../../../types";

export const grilledBeefRecipes: Meal[] = [
  {
    name: "Grilled Steak with Sweet Potato",
    calories: 520,
    protein: 45,
    carbs: 30,
    fat: 25,
    recipe: {
      ingredients: [
        "6 oz lean beef steak (300 cal)",
        "1 medium sweet potato (120 cal)",
        "2 cups mixed vegetables (50 cal)",
        "1 tbsp olive oil (120 cal)",
        "Fresh herbs (thyme, rosemary) (3 cal)",
        "2 cloves garlic (2 cal)"
      ],
      instructions: [
        "Remove steak from refrigerator 30 minutes before cooking to reach room temperature",
        "Pat steak dry thoroughly with paper towels",
        "Season steak generously with salt and pepper on both sides",
        "Peel sweet potato and cut into 1-inch wedges",
        "Toss sweet potato wedges with 1/2 tablespoon olive oil and season with salt and pepper",
        "Preheat oven to 400°F (200°C) for sweet potatoes",
        "Arrange sweet potato wedges on a baking sheet in a single layer",
        "Roast sweet potatoes for 25-30 minutes, flipping halfway through",
        "While potatoes roast, mince 2 cloves of garlic and chop fresh herbs",
        "Heat remaining 1/2 tablespoon olive oil in a cast iron skillet over high heat until smoking",
        "Place steak in hot skillet and cook for 4-5 minutes on each side for medium-rare",
        "Add garlic and herbs to the pan in the last minute of cooking",
        "Remove steak from pan and let rest for 5-10 minutes before slicing",
        "Steam mixed vegetables until tender-crisp, about 5-7 minutes",
        "Season vegetables with salt and pepper to taste",
        "Slice steak against the grain",
        "Serve steak with sweet potato wedges and steamed vegetables"
      ],
      prepTime: "10 minutes",
      cookTime: "20 minutes"
    }
  }
];