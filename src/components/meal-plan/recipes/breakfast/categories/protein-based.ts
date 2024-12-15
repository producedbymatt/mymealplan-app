import { Meal } from "../../../types";

export const proteinBasedRecipes: Meal[] = [
  {
    name: "Protein Pancakes",
    calories: 480,
    protein: 28,
    carbs: 55,
    fat: 18,
    recipe: {
      ingredients: [
        "1 cup protein pancake mix (200 cal)",
        "1 scoop protein powder (120 cal)",
        "1 medium banana (105 cal)",
        "1 tbsp maple syrup (55 cal)"
      ],
      instructions: [
        "In a large mixing bowl, combine 1 cup of protein pancake mix with 1 scoop of protein powder",
        "In a separate bowl, peel and thoroughly mash 1 medium banana until smooth",
        "Add the mashed banana to the dry ingredients",
        "Add 3/4 cup water (or as specified on pancake mix package) and whisk until smooth with no lumps",
        "Let the batter rest for 5 minutes to thicken slightly",
        "Heat a non-stick griddle or pan over medium heat",
        "Lightly coat the cooking surface with cooking spray",
        "Pour 1/4 cup portions of batter onto the heated surface",
        "Cook until bubbles form on the surface (about 2-3 minutes)",
        "Flip and cook other side until golden brown (about 1-2 minutes)",
        "Transfer to a serving plate",
        "Drizzle 1 tablespoon of maple syrup evenly over the pancakes",
        "Serve immediately while hot"
      ],
      prepTime: "10 minutes",
      cookTime: "15 minutes"
    }
  }
];