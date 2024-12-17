import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import { toast } from "sonner";

interface SignUpFormProps {
  onSuccess: () => void;
  onToggleForm: () => void;
}

export const SignUpForm = ({ onSuccess, onToggleForm }: SignUpFormProps) => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword(password)) {
      toast.error("Please fix the password errors before submitting");
      return;
    }

    setLoading(true);

    try {
      console.log("Attempting to sign up with phone:", phone);
      
      // Format phone number to ensure consistent format
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      const email = `${formattedPhone.replace(/\+/g, '')}@phone.mymealplan.app`;
      
      console.log("Using formatted email:", email);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone_number: formattedPhone,
            date_of_birth: dateOfBirth,
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;
      
      console.log("Sign up successful");
      toast.success("Account created successfully!");
      onSuccess();
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In or Sign Up for Free</h2>
      <p className="text-gray-600 text-center mb-6">
        Create an account to unlock all features including weight tracking, BMI calculation, and personalized meal plans.
      </p>
      
      <FormInput
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      
      <FormInput
        type="tel"
        placeholder="Phone Number (e.g. +1234567890)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      
      <FormInput
        type="date"
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
      />
      
      <div className="space-y-1">
        <FormInput
          type="password"
          placeholder="Password (min. 6 characters)"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          required
        />
        {passwordError && (
          <p className="text-sm text-red-500">{passwordError}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading || !!passwordError}>
        {loading ? "Loading..." : "Sign Up"}
      </Button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onToggleForm}
          className="text-primary hover:underline"
        >
          Sign In
        </button>
      </p>
    </form>
  );
};