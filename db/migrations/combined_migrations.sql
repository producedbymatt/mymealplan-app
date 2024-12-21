-- Combined migrations SQL file
BEGIN;

-- First drop the column and type if they exist (to avoid conflicts)
DO $$ 
BEGIN
    -- Drop the column if it exists
    IF EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'user_metrics' 
        AND column_name = 'activity_level'
    ) THEN
        ALTER TABLE user_metrics DROP COLUMN activity_level;
    END IF;
    
    -- Drop the type if it exists
    IF EXISTS (
        SELECT FROM pg_type 
        WHERE typname = 'activity_level_type'
    ) THEN
        DROP TYPE activity_level_type;
    END IF;
END $$;

-- Create enum type for activity levels
CREATE TYPE activity_level_type AS ENUM (
    'sedentary',
    'lightly_active',
    'moderately_active',
    'very_active',
    'extra_active'
);

-- Add activity_level column with default value
ALTER TABLE user_metrics
ADD COLUMN activity_level activity_level_type DEFAULT 'sedentary';

-- Create the recipes table if it doesn't exist
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
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

-- Insert breakfast recipes
INSERT INTO recipes (name, calories, protein, carbs, fat, prep_time, cook_time, ingredients, instructions, meal_type, category, difficulty_level)
VALUES 
    ('Classic Oatmeal with Berries', 
    300, 
    10, 
    45, 
    8, 
    '5 minutes', 
    '10 minutes',
    '[
        {"item": "Rolled oats", "amount": "1 cup"},
        {"item": "Mixed berries", "amount": "1 cup"},
        {"item": "Honey", "amount": "1 tablespoon"},
        {"item": "Milk", "amount": "1 cup"}
    ]'::jsonb,
    '[
        "Bring milk to a boil",
        "Add oats and reduce heat",
        "Cook for 5 minutes",
        "Top with berries and honey"
    ]'::jsonb,
    'breakfast',
    'oatmeal_and_bowls',
    'easy'
    ),
    ('Protein Pancakes', 
    400, 
    25, 
    35, 
    15, 
    '10 minutes', 
    '15 minutes',
    '[
        {"item": "Protein powder", "amount": "2 scoops"},
        {"item": "Eggs", "amount": "2"},
        {"item": "Banana", "amount": "1"},
        {"item": "Oat flour", "amount": "1/2 cup"}
    ]'::jsonb,
    '[
        "Blend all ingredients",
        "Heat pan over medium heat",
        "Pour batter to form pancakes",
        "Cook until bubbles form",
        "Flip and cook other side"
    ]'::jsonb,
    'breakfast',
    'protein_based',
    'medium'
    );

-- Notify PostgREST to refresh its schema cache
NOTIFY pgrst, 'reload schema';

COMMIT;