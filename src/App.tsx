import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import CalorieLogger from "./pages/CalorieLogger";
import WeightTracking from "./pages/WeightTracking";
import Profile from "./pages/Profile";
import AuthOverlay from "./components/auth/AuthOverlay";
import { supabase } from "@/lib/supabase";
import Navigation from "./components/Navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Current session:", session);
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {children}
      {!session && <AuthOverlay />}
    </>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen">
    <div className="w-full bg-[#1E2533]">
      <div className="container mx-auto flex flex-col items-center">
        <img 
          src="/lovable-uploads/f6662a44-ab76-41ca-890b-b9da00a755af.png" 
          alt="MyMealPlan Logo" 
          className="h-24 w-auto mb-4"
        />
        <Navigation />
      </div>
    </div>
    {children}
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route
            path="/calorie-logger"
            element={
              <ProtectedRoute>
                <Layout><CalorieLogger /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/weight-tracking"
            element={
              <ProtectedRoute>
                <Layout><WeightTracking /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout><Profile /></Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;