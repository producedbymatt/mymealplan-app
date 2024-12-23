import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditMetricsForm from "./EditMetricsForm";

interface UserMetrics {
  height: number;
  current_weight: number;
  target_weight: number;
  target_days: number;
  recommended_calories: number;
  gender?: 'male' | 'female';
}

interface UserMetricsCardProps {
  metrics: UserMetrics;
  onMetricsUpdate: (metrics: UserMetrics) => void;
}

const UserMetricsCard = ({ metrics, onMetricsUpdate }: UserMetricsCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const heightFeet = Math.floor(metrics.height / 12);
  const heightInches = metrics.height % 12;

  const capitalizeGender = (gender?: string) => {
    if (!gender) return "Not specified";
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Your Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <EditMetricsForm
            metrics={metrics}
            onCancel={() => setIsEditing(false)}
            onSave={(updatedMetrics) => {
              onMetricsUpdate(updatedMetrics);
              setIsEditing(false);
            }}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Your Metrics</CardTitle>
        <Button
          onClick={() => setIsEditing(true)}
          variant="outline"
          className="hover:bg-accent hover:text-accent-foreground"
        >
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Height:</strong> {heightFeet}'{heightInches}"</p>
        <p><strong>Current Weight:</strong> {metrics.current_weight} lbs</p>
        <p><strong>Gender:</strong> {capitalizeGender(metrics.gender)}</p>
      </CardContent>
    </Card>
  );
};

export default UserMetricsCard;