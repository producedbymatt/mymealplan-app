-- First, create an enum type for activity levels
CREATE TYPE activity_level_type AS ENUM (
  'sedentary',
  'lightly_active',
  'moderately_active',
  'very_active',
  'extra_active'
);

-- Convert existing text values to the corresponding enum values
ALTER TABLE user_metrics
ALTER COLUMN activity_level TYPE activity_level_type
USING (
  CASE 
    WHEN activity_level = 'sedentary' THEN 'sedentary'::activity_level_type
    WHEN activity_level = 'lightly_active' THEN 'lightly_active'::activity_level_type
    WHEN activity_level = 'moderately_active' THEN 'moderately_active'::activity_level_type
    WHEN activity_level = 'very_active' THEN 'very_active'::activity_level_type
    WHEN activity_level = 'extra_active' THEN 'extra_active'::activity_level_type
    ELSE 'sedentary'::activity_level_type
  END
);

-- Set the default value
ALTER TABLE user_metrics
ALTER COLUMN activity_level SET DEFAULT 'sedentary'::activity_level_type;