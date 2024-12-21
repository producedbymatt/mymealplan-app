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

-- ... keep existing code (breakfast recipe entries)

-- Notify PostgREST to refresh its schema cache
NOTIFY pgrst, 'reload schema';

COMMIT;