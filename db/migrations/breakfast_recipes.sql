-- Breakfast Recipes Migration SQL
-- This file contains breakfast recipe data for the meal planning application

-- Create the recipes table if it doesn't exist
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    calories INTEGER NOT NULL,
    protein INTEGER NOT NULL,
    carbs INTEGER NOT NULL,
    fat INTEGER NOT NULL,
    prep_time VARCHAR(50) NOT NULL,
    cook_time VARCHAR(50) NOT NULL,
    ingredients JSONB NOT NULL,
    instructions JSONB NOT NULL,
    meal_type VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty_level VARCHAR(20) NOT NULL
);

-- Insert breakfast recipes
INSERT INTO recipes (name, calories, protein, carbs, fat, prep_time, cook_time, ingredients, instructions, meal_type, category, difficulty_level) 
VALUES 

-- Oatmeal and Bowls
(
    'Classic Oatmeal with Berries',
    450,
    15,
    65,
    12,
    '5 minutes',
    '10 minutes',
    '[
        "1 cup rolled oats (300 cal)",
        "1 cup mixed berries (85 cal)",
        "1 tbsp honey (60 cal)",
        "1/4 cup almonds (160 cal)",
        "1 cup almond milk (30 cal)"
    ]'::jsonb,
    '[
        "In a medium saucepan, bring 1 cup of almond milk to a gentle simmer over medium heat",
        "Add 1 cup of rolled oats to the simmering almond milk, stirring immediately to combine",
        "Reduce heat to low and cook for 5-7 minutes, stirring occasionally until oats are creamy",
        "While oats are cooking, rinse 1 cup of mixed berries and roughly chop any larger berries",
        "Coarsely chop 1/4 cup of almonds into smaller pieces",
        "Once oats are cooked, remove from heat and let stand for 1 minute",
        "Transfer oats to a serving bowl",
        "Top with the prepared mixed berries",
        "Drizzle 1 tablespoon of honey evenly over the berries",
        "Sprinkle the chopped almonds on top",
        "Serve immediately while hot"
    ]'::jsonb,
    'breakfast',
    'oatmeal-and-bowls',
    'easy'
),

(
    'Breakfast Quinoa Bowl',
    430,
    16,
    62,
    14,
    '5 minutes',
    '20 minutes',
    '[
        "1 cup cooked quinoa (220 cal)",
        "1 cup almond milk (30 cal)",
        "1 tbsp honey (60 cal)",
        "1/2 cup mixed berries (40 cal)",
        "1 tbsp almonds (80 cal)"
    ]'::jsonb,
    '[
        "Rinse 1 cup of quinoa thoroughly under cold water using a fine-mesh strainer",
        "In a medium saucepan, combine the rinsed quinoa with 2 cups of water",
        "Bring to a boil, then reduce heat to low and cover",
        "Simmer for 15-20 minutes until quinoa is tender and water is absorbed",
        "While quinoa is still hot, stir in 1 cup of almond milk to create a creamy consistency",
        "Drizzle 1 tablespoon of honey and stir to combine",
        "Rinse and pat dry 1/2 cup of mixed berries",
        "Roughly chop 1 tablespoon of almonds",
        "Transfer quinoa mixture to a serving bowl",
        "Top with the prepared berries and chopped almonds",
        "Serve while warm"
    ]'::jsonb,
    'breakfast',
    'oatmeal-and-bowls',
    'easy'
),

-- Protein-Based Breakfasts
(
    'Protein Pancakes',
    480,
    28,
    55,
    18,
    '10 minutes',
    '15 minutes',
    '[
        "1 cup protein pancake mix (200 cal)",
        "1 scoop protein powder (120 cal)",
        "1 medium banana (105 cal)",
        "1 tbsp maple syrup (55 cal)"
    ]'::jsonb,
    '[
        "In a large mixing bowl, combine 1 cup of protein pancake mix with 1 scoop of protein powder",
        "In a separate bowl, thoroughly mash 1 medium banana until very few lumps remain",
        "Add the mashed banana to the dry ingredients",
        "Add water gradually, about 3/4 cup, while whisking until you achieve a smooth, pourable batter",
        "Heat a non-stick griddle or pan over medium heat",
        "Once hot, lightly coat with cooking spray",
        "Pour 1/4 cup portions of batter onto the griddle",
        "Cook until bubbles form on the surface (about 2-3 minutes)",
        "Flip pancakes and cook for another 1-2 minutes until golden brown",
        "Transfer to a serving plate",
        "Drizzle 1 tablespoon of maple syrup evenly over the pancakes",
        "Serve immediately while hot"
    ]'::jsonb,
    'breakfast',
    'protein-based',
    'medium'
);