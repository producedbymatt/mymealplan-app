import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const PersonalizedGreeting = () => {
  const [greeting, setGreeting] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.functions.invoke('generate-greeting', {
          body: { userId: user.id }
        });

        if (error) throw error;
        
        setGreeting(data.greeting);
      } catch (error) {
        console.error('Error fetching greeting:', error);
        toast.error("Failed to load personalized greeting");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGreeting();
  }, []);

  if (!greeting && !isLoading) return null;

  return (
    <Card className="p-4 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-green-950/90 to-blue-950/90 animate-gradient-x" />
      <p className="text-center text-xl font-medium text-white relative z-10">
        {isLoading ? "Loading your personal greeting..." : greeting}
      </p>
    </Card>
  );
};

export default PersonalizedGreeting;