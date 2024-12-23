import { Card } from "@/components/ui/card";

interface MotivationalMessageProps {
  currentWeight: number;
  targetWeight: number;
  targetDays: number;
}

const MotivationalMessage = ({ currentWeight, targetWeight, targetDays }: MotivationalMessageProps) => {
  if (!targetWeight || !targetDays) {
    return (
      <Card className="p-4 mb-8 bg-gradient-to-r from-blue-950/90 to-green-950/90 border-none">
        <p className="text-center text-lg font-medium text-white">
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
    <Card className="p-4 mb-8 bg-gradient-to-r from-blue-950/90 to-green-950/90 border-none">
      <p className="text-center text-lg font-medium text-white">
        {getMessage()}
      </p>
    </Card>
  );
};

export default MotivationalMessage;