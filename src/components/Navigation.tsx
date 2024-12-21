import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Navigation = () => {
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Navigation - Current session:", session);
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Navigation - Auth state changed:", session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleTabChange = (value: string) => {
    navigate(value);
  };

  return (
    <div className="w-full bg-[#1E2533] p-4 rounded-[20px]">
      <div className="container mx-auto flex items-center justify-center">
        <Tabs value={location.pathname} onValueChange={handleTabChange} className="w-auto">
          <TabsList className="bg-transparent">
            <TabsTrigger 
              value="/" 
              className="data-[state=active]:bg-white data-[state=active]:text-[#1E2533] text-white"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="/calorie-logger"
              className="data-[state=active]:bg-white data-[state=active]:text-[#1E2533] text-white"
            >
              Calorie Logger
            </TabsTrigger>
            <TabsTrigger 
              value="/weight-tracking"
              className="data-[state=active]:bg-white data-[state=active]:text-[#1E2533] text-white"
            >
              Weight Tracking
            </TabsTrigger>
            <TabsTrigger 
              value="/profile"
              className="data-[state=active]:bg-white data-[state=active]:text-[#1E2533] text-white"
            >
              Profile
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default Navigation;