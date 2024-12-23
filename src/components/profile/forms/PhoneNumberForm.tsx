import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  CardContent,
} from "@/components/ui/card";

export const PhoneNumberForm = ({ 
  phoneNumber, 
  setPhoneNumber, 
  onPhoneUpdate 
}: { 
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  onPhoneUpdate: (phone: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);

  const handlePhoneNumberChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        email: `${newPhoneNumber}@placeholder.com`
      });

      if (error) throw error;

      onPhoneUpdate(`${newPhoneNumber}@placeholder.com`);
      setPhoneNumber(newPhoneNumber);
      toast.success("Phone number updated successfully. Please verify the new phone number.");
    } catch (error) {
      console.error("Error updating phone number:", error);
      toast.error("Failed to update phone number");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handlePhoneNumberChange} className="space-y-4">
        <div>
          <label htmlFor="currentPhone" className="block text-sm font-medium mb-1">
            Current Phone Number
          </label>
          <Input
            id="currentPhone"
            type="tel"
            value={phoneNumber}
            disabled
            className="border border-input"
          />
        </div>
        <div>
          <label htmlFor="newPhone" className="block text-sm font-medium mb-1">
            New Phone Number
          </label>
          <Input
            id="newPhone"
            type="tel"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            placeholder="Enter new phone number"
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading}
          className="bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950"
        >
          {loading ? "Updating..." : "Update Phone Number"}
        </Button>
      </form>
    </CardContent>
  );
};