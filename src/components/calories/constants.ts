export const ACTIVITY_LEVELS = {
  "sedentary": {
    label: "Sedentary (little or no exercise)",
    value: 1.2
  },
  "lightly_active": {
    label: "Lightly active (exercise 1-3 times/week)",
    value: 1.375
  },
  "moderately_active": {
    label: "Moderately active (exercise 3-5 times/week)",
    value: 1.55
  },
  "very_active": {
    label: "Very active (exercise 6-7 times/week)",
    value: 1.725
  },
  "extra_active": {
    label: "Extra active (very intense exercise daily)",
    value: 1.9
  }
} as const;

export type ActivityLevelKey = keyof typeof ACTIVITY_LEVELS;