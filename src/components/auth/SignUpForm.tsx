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
    
    // Validate password before submission
    if (!validatePassword(password)) {
      toast.error("Please fix the password errors before submitting");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: `${phone}@placeholder.com`,
        password,
        options: {
          data: {
            full_name: name,
            phone_number: phone,
            date_of_birth: dateOfBirth,
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;
      toast.success("Account created successfully!");
      onSuccess();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Sign In or Sign Up for Free</h2>
      <p className="text-gray-300 text-center mb-6">
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
        placeholder="Phone Number"
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

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950" 
        disabled={loading || !!passwordError}
      >
        {loading ? "Loading..." : "Sign Up"}
      </Button>

      <p className="text-center text-sm text-white">
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