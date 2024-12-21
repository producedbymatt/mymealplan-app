interface CalorieCalculationsProps {
  currentWeight: number;
  height: number;
  activityLevel: number;
  targetWeight: number;
  targetDays: number;
}

export const calculateBMR = (currentWeight: number, height: number) => {
  const weightInKg = currentWeight * 0.453592;
  const heightInCm = height * 2.54;
  const bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * 30 + 5;
  console.log("Calculated BMR:", bmr);
  return bmr;
};

export const calculateDailyCalories = ({
  currentWeight,
  height,
  activityLevel,
  targetWeight,
  targetDays,
}: CalorieCalculationsProps) => {
  const bmr = calculateBMR(currentWeight, height);
  const tdee = bmr * activityLevel;
  
  const weightDifference = targetWeight - currentWeight;
  const isGainingWeight = weightDifference > 0;
  const totalCaloriesNeeded = Math.abs(weightDifference) * 3500;
  const dailyCalorieAdjustment = totalCaloriesNeeded / targetDays;
  
  const targetCalories = tdee + (isGainingWeight ? dailyCalorieAdjustment : -dailyCalorieAdjustment);
  
  console.log("TDEE:", tdee);
  console.log("Activity Level:", activityLevel);
  console.log("Daily calorie adjustment:", dailyCalorieAdjustment);
  console.log("Target daily calories:", targetCalories);
  
  return Math.max(1200, Math.round(targetCalories));
};

export const calculateProteinNeeds = (targetWeight: number, activityLevel: number) => {
  const baseProteinMultiplier = activityLevel >= 1.55 ? 1.0 : 0.8;
  const maxProteinMultiplier = activityLevel >= 1.55 ? 1.4 : 1.2;
  
  const minProtein = Math.round(targetWeight * baseProteinMultiplier);
  const maxProtein = Math.round(targetWeight * maxProteinMultiplier);
  
  return { minProtein, maxProtein };
};

export const getWeightChangeWarning = (weeklyChange: number, isGainingWeight: boolean) => {
  if (weeklyChange > 2) {
    return {
      message: `Your target may be too aggressive. A safe weight ${isGainingWeight ? 'gain' : 'loss'} rate is 1-2 pounds per week.`,
      color: "text-red-500"
    };
  }
  if (weeklyChange === 0) {
    return {
      message: "Your current weight matches your target weight.",
      color: "text-green-500"
    };
  }
  return {
    message: `Your target is within a healthy weight ${isGainingWeight ? 'gain' : 'loss'} range of 1-2 pounds per week.`,
    color: "text-green-500"
  };
};