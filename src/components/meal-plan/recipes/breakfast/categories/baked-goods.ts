import { Meal } from "../../../types";

export const bakedGoods: Meal[] = [
  {
    name: "Breakfast Muffins",
    calories: 420,
    protein: 18,
    carbs: 48,
    fat: 20,
    recipe: {
      ingredients: [
        "1.5 cups whole wheat flour (180 cal)",
        "1 banana (105 cal)",
        "1 egg (70 cal)",
        "1/4 cup honey (240 cal)",
        "1/4 cup walnuts (180 cal)"
      ],
      instructions: [
        "Preheat oven to 350°F (175°C)",
        "Line a muffin tin with paper liners or grease well",
        "In a large bowl, whisk together whole wheat flour with baking powder and salt",
        "In a separate bowl, mash 1 banana until very smooth",
        "Add 1 egg to the mashed banana and whisk to combine",
        "Stir in 1/4 cup honey",
        "Pour wet ingredients into dry ingredients",
        "Mix until just combined - do not overmix",
        "Roughly chop 1/4 cup walnuts",
        "Fold chopped walnuts into the batter",
        "Divide batter evenly among muffin cups",
        "Bake for 20-25 minutes until golden brown",
        "Test with a toothpick - it should come out clean",
        "Cool in pan for 5 minutes",
        "Remove from pan and cool completely on wire rack"
      ],
      prepTime: "15 minutes",
      cookTime: "25 minutes"
    }
  }
];