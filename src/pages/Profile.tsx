import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import UserMetricsCard from "@/components/profile/UserMetricsCard";
import EditMetricsForm from "@/components/profile/EditMetricsForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [metrics, setMetrics] = useState({
    height: 70,
    current_weight: 150,
    target_weight: 140,
    target_days: 90,
    recommended_calories: 2000,
    gender: 'male' as 'male' | 'female'
  });

  const handleMetricsUpdate = async (newMetrics: typeof metrics) => {
    try {
      setMetrics(newMetrics);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Header />
        <h1 className="text-3xl font-bold text-center mb-8">Profile</h1>
        <div className="max-w-2xl mx-auto">
          {isEditing ? (
            <Card className="p-6">
              <EditMetricsForm
                metrics={metrics}
                onSave={handleMetricsUpdate}
                onCancel={() => setIsEditing(false)}
              />
            </Card>
          ) : (
            <UserMetricsCard
              metrics={metrics}
              onMetricsUpdate={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;