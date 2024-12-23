import { Card } from "@/components/ui/card";

interface MotivationalMessageProps {
  currentWeight: number;
  targetWeight: number;
  targetDays: number;
}

const MotivationalMessage = ({ currentWeight, targetWeight, targetDays }: MotivationalMessageProps) => {
  if (!targetWeight || !targetDays) {
    return (
      <Card className="p-4 mb-8 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-yellow-500/90 to-orange-600/90 animate-gradient-x" />
        {/* Content */}
        <p className="text-center text-lg font-medium text-white relative z-10">
          Set your weight goal and timeline to get personalized motivation and tracking! 🎯
        </p>
      </Card>
    );
  }

  const weightDifference = targetWeight - currentWeight;
  const isGainingWeight = weightDifference > 0;
  const weeksToGoal = targetDays / 7;
  const poundsPerWeek = Math.abs(weightDifference / weeksToGoal);

  const getMessage = () => {
    console.log('Calculating motivational message:', {
      weightDifference,
      weeksToGoal,
      poundsPerWeek,
      isGainingWeight
    });

    if (weightDifference === 0) {
      return "You're already at your target weight! Keep maintaining those healthy habits! 🎉";
    }

    if (isGainingWeight) {
      if (poundsPerWeek > 2) {
        return `To reach your goal, you'll need to gain ${poundsPerWeek.toFixed(1)} lbs per week. Consider extending your timeline for a more sustainable approach of 1-2 lbs per week. 🎯`;
      }
      return `You're aiming to gain ${poundsPerWeek.toFixed(1)} lbs per week - that's a healthy and achievable goal! Keep going! 💪`;
    } else {
      if (poundsPerWeek > 2) {
        return `To reach your goal, you'll need to lose ${poundsPerWeek.toFixed(1)} lbs per week. Consider extending your timeline for a more sustainable approach of 1-2 lbs per week. 🎯`;
      }
      return `You're aiming to lose ${poundsPerWeek.toFixed(1)} lbs per week - that's a healthy and achievable goal! Keep going! 💪`;
    }
  };

  return (
    <Card className="p-4 mb-8 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-yellow-500/90 to-orange-600/90 animate-gradient-x" />
      {/* Content */}
      <p className="text-center text-lg font-medium text-white relative z-10">
        {getMessage()}
      </p>
    </Card>
  );
};

export default MotivationalMessage;