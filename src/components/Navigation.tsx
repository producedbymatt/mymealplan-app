import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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

  const handleTabChange = (value: string) => {
    navigate(value);
  };

  return (
    <div className="w-full bg-[#1E2533] p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <img 
            src="/lovable-uploads/67003c76-1908-4b2f-93d3-01ea4a4cf510.png" 
            alt="MyMealPlan Logo" 
            className="h-8 w-auto"
          />
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
                Charts
              </TabsTrigger>
              <TabsTrigger 
                value="/weight-tracking"
                className="data-[state=active]:bg-white data-[state=active]:text-[#1E2533] text-white"
              >
                Report
              </TabsTrigger>
              <TabsTrigger 
                value="/profile"
                className="data-[state=active]:bg-white data-[state=active]:text-[#1E2533] text-white"
              >
                Snapshot
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Button
          variant={session ? "destructive" : "default"}
          className={session ? "bg-red-600 hover:bg-red-700" : ""}
          onClick={async () => {
            if (session) {
              await handleSignOut();
            } else {
              navigate("/");
            }
          }}
        >
          {session ? "Sign Out" : "Sign In"}
        </Button>
      </div>
    </div>
  );
};

export default Navigation;