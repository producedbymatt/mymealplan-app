-- First, create an enum type for activity levels
CREATE TYPE activity_level_type AS ENUM (
  'sedentary',
  'lightly_active',
  'moderately_active',
  'very_active',
  'extra_active'
);

-- Convert existing decimal values to the corresponding enum values
ALTER TABLE user_metrics
ALTER COLUMN activity_level TYPE activity_level_type
USING (
  CASE 
    WHEN activity_level <= 1.2 THEN 'sedentary'::activity_level_type
    WHEN activity_level <= 1.375 THEN 'lightly_active'::activity_level_type
    WHEN activity_level <= 1.55 THEN 'moderately_active'::activity_level_type
    WHEN activity_level <= 1.725 THEN 'very_active'::activity_level_type
    ELSE 'extra_active'::activity_level_type
  END
);

-- Set the default value
ALTER TABLE user_metrics
ALTER COLUMN activity_level SET DEFAULT 'sedentary'::activity_level_type;