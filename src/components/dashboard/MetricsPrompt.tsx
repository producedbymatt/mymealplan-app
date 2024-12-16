import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const MetricsPrompt = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <AlertCircle className="h-8 w-8 text-yellow-500" />
        <div>
          <h3 className="text-lg font-semibold">Enter Your Metrics</h3>
          <p className="text-gray-600">
            Please enter your height, weight, and goals to view your personalized dashboard statistics.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MetricsPrompt;