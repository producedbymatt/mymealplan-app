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

-- Notify PostgREST to refresh its schema cache
NOTIFY pgrst, 'reload schema';