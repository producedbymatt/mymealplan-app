import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import NavigationButton from "./navigation/NavigationButton";
import NavigationHeader from "./navigation/NavigationHeader";
import NavigationMenu from "./navigation/NavigationMenu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Navigation - Current session:", session);
      setSession(session);
    });

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

  const handleClose = () => {
    console.log("Closing navigation menu");
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <NavigationButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50">
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg mt-16">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-50"
              onClick={handleClose}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <NavigationHeader 
              userEmail={session?.user?.email} 
              onClose={handleClose} 
            />
            
            <NavigationMenu
              session={session}
              onClose={handleClose}
              onSignOut={handleSignOut}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;