import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { PhoneNumberForm } from "./forms/PhoneNumberForm";
import { PasswordForm } from "./forms/PasswordForm";

interface UserDetails {
  full_name: string | null;
  email: string | null;
  date_of_birth: string | null;
}

const UserDetailsForm = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    full_name: "",
    email: "",
    date_of_birth: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");

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

      setPhoneNumber(user.email?.replace("@placeholder.com", "") || "");
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to load user details");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <PersonalInfoForm userDetails={userDetails} setUserDetails={setUserDetails} />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update Phone Number</CardTitle>
          <CardDescription>Change your phone number</CardDescription>
        </CardHeader>
        <PhoneNumberForm 
          phoneNumber={phoneNumber} 
          setPhoneNumber={setPhoneNumber}
          onPhoneUpdate={(email) => setUserDetails(prev => ({ ...prev, email }))}
        />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password</CardDescription>
        </CardHeader>
        <PasswordForm />
      </Card>
    </div>
  );
};

export default UserDetailsForm;