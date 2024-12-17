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

-- ... keep existing code (previous recipe entries)

-- Breakfast Bowls
(
    'Breakfast Rice Bowl',
    450,
    16,
    65,
    16,
    '5 minutes',
    '45 minutes',
    '[
        "1 cup brown rice (220 cal)",
        "1 cup almond milk (30 cal)",
        "1 tbsp maple syrup (55 cal)",
        "1/2 cup mixed berries (40 cal)",
        "1 tbsp almonds (80 cal)",
        "Cinnamon (5 cal)"
    ]'::jsonb,
    '[
        "Rinse 1 cup of brown rice until water runs clear",
        "Cook rice according to package instructions",
        "Once rice is cooked, transfer to a serving bowl",
        "Heat 1 cup of almond milk in a small saucepan until warm",
        "Pour warm almond milk over the rice and stir to combine",
        "Add 1 tablespoon of maple syrup and stir well",
        "Rinse and pat dry 1/2 cup of mixed berries",
        "Top rice with berries and chopped almonds",
        "Sprinkle with cinnamon to taste",
        "Serve while warm"
    ]'::jsonb,
    'breakfast',
    'breakfast-bowls',
    'easy'
),

(
    'Morning Grain Bowl',
    440,
    18,
    62,
    16,
    '5 minutes',
    '30 minutes',
    '[
        "1/2 cup steel cut oats (150 cal)",
        "1/4 cup quinoa (110 cal)",
        "1 cup almond milk (30 cal)",
        "1 apple, diced (95 cal)",
        "1 tbsp maple syrup (55 cal)",
        "Cinnamon (5 cal)"
    ]'::jsonb,
    '[
        "Rinse quinoa thoroughly under cold water",
        "Cook quinoa in 1/2 cup water for about 15 minutes until tender",
        "In a separate pot, combine steel cut oats with 1.5 cups water",
        "Bring oats to a boil, then reduce heat and simmer for 20-25 minutes",
        "Once both grains are cooked, combine them in a large bowl",
        "Heat almond milk until warm",
        "Add warm almond milk to the grain mixture",
        "Wash and dice apple into small cubes",
        "Add diced apple to the bowl",
        "Drizzle with maple syrup",
        "Sprinkle with cinnamon to taste",
        "Stir gently to combine all ingredients",
        "Serve while warm"
    ]'::jsonb,
    'breakfast',
    'breakfast-bowls',
    'medium'
),

(
    'Protein Smoothie Bowl',
    450,
    30,
    52,
    16,
    '5 minutes',
    '0 minutes',
    '[
        "1 scoop protein powder (120 cal)",
        "1 frozen banana (105 cal)",
        "1 cup frozen berries (85 cal)",
        "1 cup almond milk (30 cal)",
        "1/4 cup granola (120 cal)"
    ]'::jsonb,
    '[
        "Blend protein powder, fruits, and milk",
        "Pour into bowl",
        "Top with granola",
        "Add additional toppings if desired",
        "Serve immediately"
    ]'::jsonb,
    'breakfast',
    'breakfast-bowls',
    'easy'
);