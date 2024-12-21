export type ActivityLevelType = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';

export type ActivityLevel = {
  value: ActivityLevelType;
  label: string;
  multiplier: number;
};

export const ACTIVITY_LEVELS: ActivityLevel[] = [
  { value: 'sedentary', label: "Sedentary (little or no exercise)", multiplier: 1.2 },
  { value: 'lightly_active', label: "Lightly active (exercise 1-3 times/week)", multiplier: 1.375 },
  { value: 'moderately_active', label: "Moderately active (exercise 3-5 times/week)", multiplier: 1.55 },
  { value: 'very_active', label: "Very active (exercise 6-7 times/week)", multiplier: 1.725 },
  { value: 'extra_active', label: "Extra active (very intense exercise daily)", multiplier: 1.9 }
];

export const getActivityMultiplier = (level: ActivityLevelType): number => {
  return ACTIVITY_LEVELS.find(l => l.value === level)?.multiplier || 1.2;
};