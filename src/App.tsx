import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
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
    // Initialize session
    const initSession = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          // Clear any stale session data
          await supabase.auth.signOut();
          setSession(null);
        } else {
          console.log('Current session:', currentSession);
          setSession(currentSession);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error initializing session:', err);
        setLoading(false);
      }
    };

    initSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Auth state changed:', event, newSession);
      
      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      }
      
      if (event === 'SIGNED_OUT') {
        // Clear any local session data
        setSession(null);
      } else {
        setSession(newSession);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Add dark mode by default and detect changes
  useEffect(() => {
    document.documentElement.classList.add('dark');
    setIsDarkMode(true);

    // Watch for class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const htmlElement = document.documentElement;
          setIsDarkMode(htmlElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="w-full bg-background">
        <div className="container mx-auto flex flex-col items-center">
          <img 
            src={isDarkMode 
              ? "/lovable-uploads/f6662a44-ab76-41ca-890b-b9da00a755af.png"  // White logo for dark mode
              : "/lovable-uploads/67003c76-1908-4b2f-93d3-01ea4a4cf510.png"  // Original logo for light mode
            }
            alt="MyMealPlan Logo" 
            className="h-24 w-auto mb-4"
          />
          <Navigation />
        </div>
      </div>
      {children}
    </div>
  );
};

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
          {/* Catch-all route - redirects to dashboard for any unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;