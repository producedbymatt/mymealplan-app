import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface UserMetrics {
  height: number;
  current_weight: number;
  target_weight: number;
  target_days: number;
  recommended_calories: number;
  gender?: 'male' | 'female';
}

interface EditMetricsFormProps {
  metrics: UserMetrics;
  onCancel: () => void;
  onSave: (metrics: UserMetrics) => void;
}

const EditMetricsForm = ({ metrics, onCancel, onSave }: EditMetricsFormProps) => {
  const [formData, setFormData] = useState<UserMetrics>(metrics);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to update your metrics");
        return;
      }

      const { error } = await supabase
        .from('user_metrics')
        .upsert({
          user_id: user.id,
          height: formData.height,
          current_weight: formData.current_weight,
          target_weight: formData.target_weight,
          target_days: formData.target_days,
          recommended_calories: formData.recommended_calories,
          gender: formData.gender,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success("Metrics updated successfully!");
      onSave(formData);
    } catch (error) {
      console.error('Error updating metrics:', error);
      toast.error("Failed to update metrics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Height (inches)</label>
        <Input
          type="number"
          value={formData.height}
          onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Current Weight (lbs)</label>
        <Input
          type="number"
          value={formData.current_weight}
          onChange={(e) => setFormData({ ...formData, current_weight: Number(e.target.value) })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Target Weight (lbs)</label>
        <Input
          type="number"
          value={formData.target_weight}
          onChange={(e) => setFormData({ ...formData, target_weight: Number(e.target.value) })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Target Days</label>
        <Input
          type="number"
          value={formData.target_days}
          onChange={(e) => setFormData({ ...formData, target_days: Number(e.target.value) })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Daily Calories Goal</label>
        <Input
          type="number"
          value={formData.recommended_calories}
          onChange={(e) => setFormData({ ...formData, recommended_calories: Number(e.target.value) })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <Select
          value={formData.gender}
          onValueChange={(value: 'male' | 'female') => setFormData({ ...formData, gender: value })}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditMetricsForm;