import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const MetricsPrompt = () => {
  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Welcome to MyMealPlan!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          To get started with your personalized meal plan and calorie tracking, we need some information about your health goals.
        </p>
        <div className="flex justify-center">
          <Link to="/profile">
            <Button>Set Up Your Profile</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsPrompt;