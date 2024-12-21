export type ActivityLevel = {
  value: number;
  label: string;
};

export const ACTIVITY_LEVELS: ActivityLevel[] = [
  { value: 1.2, label: "Sedentary (little or no exercise)" },
  { value: 1.375, label: "Lightly active (exercise 1-3 times/week)" },
  { value: 1.55, label: "Moderately active (exercise 3-5 times/week)" },
  { value: 1.725, label: "Very active (exercise 6-7 times/week)" },
  { value: 1.9, label: "Extra active (very intense exercise daily)" }
];