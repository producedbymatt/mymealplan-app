import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProteinSummaryCardProps {
  todayProtein: number;
  proteinGoal: number | null;
}

const ProteinSummaryCard = ({ todayProtein, proteinGoal }: ProteinSummaryCardProps) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 via-pink-950/90 to-purple-950/90 animate-gradient-x" />

      <CardHeader className="relative z-10">
        <CardTitle className="text-white">Today's Protein Intake</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bold text-white">{todayProtein}g</p>
          {proteinGoal && (
            <p className="text-2xl font-semibold text-pink-300">
              Target: {proteinGoal}g
            </p>
          )}
        </div>
        {proteinGoal && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  todayProtein >= proteinGoal ? 'bg-green-500' : 'bg-pink-500'
                }`}
                style={{
                  width: `${Math.min((todayProtein / proteinGoal) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <p className="mt-2 text-sm font-semibold text-white">
              Remaining: {Math.max(proteinGoal - todayProtein, 0)}g
              {todayProtein > proteinGoal && (
                <span className="text-green-300 ml-2">({todayProtein - proteinGoal}g over)</span>
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProteinSummaryCard;
