import { Card } from "@/components/ui/card";

interface MotivationalMessageProps {
  currentWeight: number;
  targetWeight: number;
  targetDays: number;
}

const MotivationalMessage = ({ currentWeight, targetWeight, targetDays }: MotivationalMessageProps) => {
  if (!targetWeight || !targetDays) {
    return (
      <Card className="p-4 mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-none">
        <p className="text-center text-lg font-medium text-gray-700">
          Set your weight goal and timeline to get personalized motivation and tracking! 🎯
        </p>
      </Card>
    );
  }

  const weightToLose = currentWeight - targetWeight;
  const weeksToGoal = targetDays / 7;
  const poundsPerWeek = weightToLose / weeksToGoal;

  const getMessage = () => {
    console.log('Calculating motivational message:', {
      weightToLose,
      weeksToGoal,
      poundsPerWeek
    });

    if (poundsPerWeek <= 0) {
      return "You're already at or below your target weight! Keep up the good work! 🎉";
    }

    if (poundsPerWeek > 2) {
      return `To reach your goal, you'll need to lose ${poundsPerWeek.toFixed(1)} lbs per week. Consider extending your timeline for a more sustainable approach of 1-2 lbs per week. 🎯`;
    }

    return `You're aiming to lose ${poundsPerWeek.toFixed(1)} lbs per week - that's a healthy and achievable goal! Keep going! 💪`;
  };

  return (
    <Card className="p-4 mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-none">
      <p className="text-center text-lg font-medium text-gray-700">
        {getMessage()}
      </p>
    </Card>
  );
};

export default MotivationalMessage;