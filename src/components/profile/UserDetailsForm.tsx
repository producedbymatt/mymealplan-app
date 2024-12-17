import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserDetails {
  full_name: string | null;
  email: string | null;
  date_of_birth: string | null;
}

const UserDetailsForm = () => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    full_name: "",
    email: "",
    date_of_birth: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("No user found");
        return;
      }

      console.log("Fetched user details:", user);
      
      setUserDetails({
        full_name: user.user_metadata?.full_name || "",
        email: user.email || "",
        date_of_birth: user.user_metadata?.date_of_birth || "",
      });

      // Set the initial phone number without @placeholder.com
      setNewPhoneNumber(user.email?.replace("@placeholder.com", "") || "");
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to load user details");
    }
  };

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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setNewPassword("");
      toast.success("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneNumberChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        email: `${newPhoneNumber}@placeholder.com`
      });

      if (error) throw error;

      // Update the local state with the new email
      setUserDetails(prev => ({
        ...prev,
        email: `${newPhoneNumber}@placeholder.com`
      }));

      toast.success("Phone number updated successfully. Please verify the new phone number.");
    } catch (error) {
      console.error("Error updating phone number:", error);
      toast.error("Failed to update phone number");
    } finally {
      setLoading(false);
    }
  };

  // Extract phone number from email by removing @placeholder.com
  const phoneNumber = userDetails.email?.replace("@placeholder.com", "") || "";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
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
                  setUserDetails({ ...userDetails, full_name: e.target.value })
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
                  setUserDetails({ ...userDetails, date_of_birth: e.target.value })
                }
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update Phone Number</CardTitle>
          <CardDescription>Change your phone number</CardDescription>
        </CardHeader>
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
                className="bg-gray-50"
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
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Phone Number"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium mb-1"
              >
                New Password
              </label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={6}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailsForm;