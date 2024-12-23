import UserMetricsCard from "@/components/profile/UserMetricsCard";
import UserDetailsForm from "@/components/profile/UserDetailsForm";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
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
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

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

  const handleSignOut = async () => {
    console.log("Starting sign out process...");
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
      return;
    }
    
    console.log("Sign out successful");
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <Button 
          variant="destructive"
          className="bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
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