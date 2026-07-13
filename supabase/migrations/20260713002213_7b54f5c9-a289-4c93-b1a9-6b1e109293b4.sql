
-- Keep only the most recent row per user, merging non-null values from older rows
WITH ranked AS (
  SELECT id, user_id,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM public.user_metrics
),
keepers AS (SELECT id, user_id FROM ranked WHERE rn = 1),
merged AS (
  SELECT
    k.id,
    (array_agg(um.activity_level) FILTER (WHERE um.activity_level IS NOT NULL))[1] AS activity_level,
    (array_agg(um.recommended_calories) FILTER (WHERE um.recommended_calories IS NOT NULL))[1] AS recommended_calories,
    (array_agg(um.protein_goal) FILTER (WHERE um.protein_goal IS NOT NULL))[1] AS protein_goal,
    (array_agg(um.gender) FILTER (WHERE um.gender IS NOT NULL))[1] AS gender,
    (array_agg(um.height) FILTER (WHERE um.height IS NOT NULL))[1] AS height,
    (array_agg(um.current_weight) FILTER (WHERE um.current_weight IS NOT NULL))[1] AS current_weight,
    (array_agg(um.target_weight) FILTER (WHERE um.target_weight IS NOT NULL))[1] AS target_weight,
    (array_agg(um.target_days) FILTER (WHERE um.target_days IS NOT NULL))[1] AS target_days
  FROM keepers k
  JOIN public.user_metrics um ON um.user_id = k.user_id
  GROUP BY k.id
)
UPDATE public.user_metrics um
SET activity_level = COALESCE(um.activity_level, m.activity_level),
    recommended_calories = COALESCE(um.recommended_calories, m.recommended_calories),
    protein_goal = COALESCE(um.protein_goal, m.protein_goal),
    gender = COALESCE(um.gender, m.gender),
    height = COALESCE(um.height, m.height),
    current_weight = COALESCE(um.current_weight, m.current_weight),
    target_weight = COALESCE(um.target_weight, m.target_weight),
    target_days = COALESCE(um.target_days, m.target_days)
FROM merged m
WHERE um.id = m.id;

DELETE FROM public.user_metrics
WHERE id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
    FROM public.user_metrics
  ) r WHERE rn = 1
);

ALTER TABLE public.user_metrics ADD CONSTRAINT user_metrics_user_id_key UNIQUE (user_id);
