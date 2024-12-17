import React from "react";
import UserMetricsCard from "@/components/profile/UserMetricsCard";
import UserDetailsForm from "@/components/profile/UserDetailsForm";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Profile = () => {
  const [metrics, setMetrics] = useState({
    height: 0,
    current_weight: 0,
    target_weight: 0,
    target_days: 0,
    recommended_calories: 2000,
    gender: undefined as "male" | "female" | undefined,
  });

  useEffect(() => {
    loadUserMetrics();
  }, []);

  const loadUserMetrics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("No user found");
        return;
      }

      console.log("Fetching metrics for user:", user.id);

      const { data, error } = await supabase
        .from("user_metrics")
        .select("*")
        .eq("user_id", user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error loading metrics:", error);
        toast.error("Failed to load user metrics");
        return;
      }

      if (data) {
        console.log("Loaded user metrics:", data);
        setMetrics({
          height: data.height || 0,
          current_weight: data.current_weight || 0,
          target_weight: data.target_weight || 0,
          target_days: data.target_days || 0,
          recommended_calories: data.recommended_calories || 2000,
          gender: data.gender,
        });
      }
    } catch (error) {
      console.error("Exception loading metrics:", error);
      toast.error("Failed to load user metrics");
    }
  };

  const handleMetricsUpdate = (newMetrics: typeof metrics) => {
    setMetrics(newMetrics);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <UserDetailsForm />
        </div>
        <div>
          <UserMetricsCard metrics={metrics} onMetricsUpdate={handleMetricsUpdate} />
        </div>
      </div>
    </div>
  );
};

export default Profile;