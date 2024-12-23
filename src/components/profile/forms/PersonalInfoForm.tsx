import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  CardContent,
} from "@/components/ui/card";

interface UserDetails {
  full_name: string | null;
  email: string | null;
  date_of_birth: string | null;
}

export const PersonalInfoForm = ({ userDetails, setUserDetails }: { 
  userDetails: UserDetails; 
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpdateDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw userError || new Error("No user found");
      }

      const { error } = await supabase.auth.updateUser({
        data: { 
          full_name: userDetails.full_name,
          date_of_birth: userDetails.date_of_birth
        }
      });

      if (error) throw error;

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleUpdateDetails} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <Input
            id="fullName"
            type="text"
            value={userDetails.full_name || ""}
            onChange={(e) =>
              setUserDetails(prev => ({ ...prev, full_name: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="dob" className="block text-sm font-medium mb-1">
            Date of Birth
          </label>
          <Input
            id="dob"
            type="date"
            value={userDetails.date_of_birth || ""}
            onChange={(e) =>
              setUserDetails(prev => ({ ...prev, date_of_birth: e.target.value }))
            }
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading}
          className="bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950"
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </CardContent>
  );
};