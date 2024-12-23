import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const MetricsPrompt = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("MetricsPrompt - Current session:", session);
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("MetricsPrompt - Auth state changed:", session);
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null; // Don't render anything while checking auth status
  }

  if (!session) {
    return null; // Don't render if user is not authenticated
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <AlertCircle className="h-8 w-8 text-yellow-500" />
        <div>
          <h3 className="text-lg font-semibold">Enter Your Metrics</h3>
          <p className="text-gray-600">
            Please enter your height, weight, and goals to view your personalized dashboard statistics.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MetricsPrompt;