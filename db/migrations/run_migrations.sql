-- Run all migrations in the correct order
BEGIN;

-- Include breakfast recipes migration
\ir breakfast_recipes.sql;

-- Include activity level migration
\ir add_activity_level.sql;

COMMIT;