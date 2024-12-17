import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Weight, Gauge, ClipboardList, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

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

  return (
    <div className="relative z-50">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <Menu className="h-7 w-7" />
        )}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50">
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="flex flex-col p-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
              <img 
                src="/lovable-uploads/67003c76-1908-4b2f-93d3-01ea4a4cf510.png" 
                alt="MyMealPlan Logo" 
                className="h-16 w-auto mx-auto mb-6"
              />
              <Link
                to="/"
                className="px-4 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Gauge className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/calorie-logger"
                className="px-4 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <ClipboardList className="h-4 w-4" />
                Calorie Logger
              </Link>
              <Link
                to="/weight-tracking"
                className="px-4 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Weight className="h-4 w-4" />
                Weight Tracking
              </Link>
              <Link
                to="/profile"
                className="px-4 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <UserCircle className="h-4 w-4" />
                Profile
              </Link>
              <Button
                variant={session ? "ghost" : "default"}
                className={session ? "mt-4 text-red-600 hover:text-red-700 hover:bg-red-50" : "mt-4"}
                onClick={async () => {
                  if (session) {
                    await handleSignOut();
                  } else {
                    navigate("/");
                  }
                  setIsOpen(false);
                }}
              >
                {session ? "Sign Out" : "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;