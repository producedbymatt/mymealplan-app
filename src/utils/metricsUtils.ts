import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export const updateUserMetrics = async (
  heightInInches: number, 
  weightInPounds: number,
  gender: "male" | "female"
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log('No user found, skipping metrics update');
      return;
    }

    console.log('Updating user metrics:', { height: heightInInches, weight: weightInPounds });

    const { data: existingMetrics } = await supabase
      .from('user_metrics')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const metricsToUpdate = {
      user_id: user.id,
      height: heightInInches,
      current_weight: weightInPounds,
      target_weight: existingMetrics?.target_weight,
      target_days: existingMetrics?.target_days,
      recommended_calories: existingMetrics?.recommended_calories,
      gender: gender,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('user_metrics')
      .upsert(metricsToUpdate);

    if (error) {
      console.error('Error updating metrics:', error);
      toast({
        title: "Error",
        description: "Failed to save your metrics",
        variant: "destructive",
      });
      return;
    }

    console.log('Successfully updated user metrics');
    toast({
      title: "Success",
      description: "Your metrics have been updated",
    });
  } catch (err) {
    console.error('Exception while updating metrics:', err);
    toast({
      title: "Error",
      description: "An error occurred while saving your metrics",
      variant: "destructive",
    });
  }
};