-- First drop the enum type (if it exists)
DROP TYPE IF EXISTS activity_level_type;

-- Then drop the column
ALTER TABLE user_metrics
DROP COLUMN IF EXISTS activity_level;