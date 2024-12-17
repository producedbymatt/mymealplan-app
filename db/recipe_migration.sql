-- Recipe Migration SQL
-- This file contains all recipe data for the meal planning application

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

-- Clear existing data to prevent duplicates
TRUNCATE TABLE recipes;

-- Insert all recipes
INSERT INTO recipes (name, calories, protein, carbs, fat, prep_time, cook_time, ingredients, instructions, meal_type, category, difficulty_level) 
VALUES 

-- Breakfast Recipes - Oatmeal and Bowls
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
),

-- Lunch Recipes - Salads
(
    'Mediterranean Salad',
    450,
    25,
    35,
    28,
    '15 minutes',
    '0 minutes',
    '[
        "2 cups mixed greens (10 cal)",
        "4 oz grilled chicken (180 cal)",
        "1/4 cup chickpeas (60 cal)",
        "2 oz feta cheese (150 cal)",
        "10 kalamata olives (100 cal)",
        "2 tbsp olive oil (240 cal)"
    ]'::jsonb,
    '[
        "Pat chicken breast dry with paper towels",
        "Season chicken with 1 tsp each of dried oregano, salt, and black pepper",
        "Heat grill or grill pan over medium-high heat",
        "Grill chicken for 6-7 minutes per side until internal temperature reaches 165°F",
        "While chicken cooks, thoroughly wash and dry mixed greens",
        "Drain and rinse chickpeas, pat dry with paper towels",
        "Slice kalamata olives in half if desired",
        "Let chicken rest for 5 minutes after cooking",
        "Slice chicken against the grain into thin strips",
        "In a large serving bowl, arrange mixed greens as the base",
        "Add chickpeas in a section of the bowl",
        "Arrange sliced grilled chicken in another section",
        "Crumble feta cheese over the entire salad",
        "Place kalamata olives around the bowl",
        "Just before serving, drizzle olive oil evenly over all ingredients",
        "Optional: add fresh cracked black pepper and dried oregano",
        "Toss gently to combine all ingredients when ready to eat"
    ]'::jsonb,
    'lunch',
    'salads',
    'easy'
),

-- Dinner Recipes - Seafood
(
    'Baked Cod with Quinoa',
    440,
    38,
    40,
    15,
    '10 minutes',
    '25 minutes',
    '[
        "6 oz cod fillet (140 cal)",
        "1 cup cooked quinoa (220 cal)",
        "1 cup roasted vegetables (50 cal)",
        "1 tbsp olive oil (120 cal)",
        "Lemon and herbs (10 cal)"
    ]'::jsonb,
    '[
        "Preheat oven to 400°F (200°C)",
        "Rinse quinoa thoroughly and cook according to package instructions",
        "Pat cod fillet dry with paper towels",
        "Season cod with salt, pepper, and fresh herbs",
        "Cut mixed vegetables into uniform pieces",
        "Toss vegetables with half the olive oil",
        "Place vegetables on a baking sheet and roast for 15 minutes",
        "Drizzle remaining olive oil over cod",
        "Place cod on the baking sheet with vegetables",
        "Bake for 10-12 minutes until fish flakes easily",
        "Squeeze fresh lemon juice over fish",
        "Fluff quinoa with a fork",
        "Serve cod over quinoa with roasted vegetables"
    ]'::jsonb,
    'dinner',
    'seafood',
    'medium'
);

-- Continue with remaining recipes...
