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

-- Egg-Based Breakfasts
(
    'Spinach and Feta Omelette',
    380,
    24,
    8,
    28,
    '10 minutes',
    '10 minutes',
    '[
        "3 large eggs (210 cal)",
        "1 cup fresh spinach (7 cal)",
        "1 oz feta cheese (74 cal)",
        "1 tbsp olive oil (120 cal)",
        "Salt and pepper to taste (0 cal)"
    ]'::jsonb,
    '[
        "Crack 3 eggs into a bowl and whisk until well combined",
        "Season with salt and pepper",
        "Heat olive oil in a non-stick pan over medium heat",
        "Add fresh spinach and cook until wilted (about 1 minute)",
        "Pour in whisked eggs",
        "As eggs begin to set, lift edges to allow uncooked egg to flow underneath",
        "When eggs are mostly set, sprinkle crumbled feta over one half",
        "Fold omelette in half over the cheese",
        "Cook for another minute until cheese begins to melt",
        "Slide onto a plate and serve immediately"
    ]'::jsonb,
    'breakfast',
    'egg-based',
    'medium'
),

-- Breakfast Bowls
(
    'Acai Breakfast Bowl',
    420,
    8,
    62,
    18,
    '10 minutes',
    '0 minutes',
    '[
        "2 acai berry packets (200 cal)",
        "1 banana (105 cal)",
        "1/4 cup granola (60 cal)",
        "1 tbsp honey (60 cal)",
        "2 tbsp mixed seeds (95 cal)"
    ]'::jsonb,
    '[
        "Break frozen acai packets into chunks",
        "Blend acai with half a banana until smooth",
        "Pour into a serving bowl",
        "Slice remaining banana half",
        "Top with sliced banana",
        "Add granola",
        "Drizzle with honey",
        "Sprinkle mixed seeds on top",
        "Serve immediately while cold"
    ]'::jsonb,
    'breakfast',
    'breakfast-bowls',
    'easy'
),

-- Healthy Toast Options
(
    'Ricotta Fig Toast',
    340,
    14,
    42,
    16,
    '5 minutes',
    '5 minutes',
    '[
        "2 slices whole grain bread (160 cal)",
        "1/2 cup ricotta cheese (100 cal)",
        "2 fresh figs (74 cal)",
        "1 tbsp honey (60 cal)",
        "Fresh thyme (2 cal)"
    ]'::jsonb,
    '[
        "Toast bread slices until golden brown",
        "Spread ricotta cheese evenly on each slice",
        "Slice figs thinly",
        "Arrange fig slices on top of ricotta",
        "Drizzle with honey",
        "Sprinkle with fresh thyme leaves",
        "Serve immediately"
    ]'::jsonb,
    'breakfast',
    'toast',
    'easy'
),

-- Breakfast Sandwiches
(
    'Mediterranean Breakfast Pita',
    420,
    18,
    48,
    22,
    '10 minutes',
    '5 minutes',
    '[
        "1 whole wheat pita (170 cal)",
        "2 scrambled eggs (140 cal)",
        "1/4 cup hummus (100 cal)",
        "Handful mixed greens (5 cal)",
        "2 tbsp olive tapenade (45 cal)"
    ]'::jsonb,
    '[
        "Warm pita bread in toaster or oven",
        "Scramble eggs with salt and pepper",
        "Spread hummus inside warmed pita",
        "Add scrambled eggs",
        "Top with mixed greens",
        "Add olive tapenade",
        "Serve while warm"
    ]'::jsonb,
    'breakfast',
    'sandwiches',
    'easy'
);