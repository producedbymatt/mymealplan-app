import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface SignInFormProps {
  onSuccess: () => void;
  onToggleForm: () => void;
}

export const SignInForm = ({ onSuccess, onToggleForm }: SignInFormProps) => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Attempting to sign in with phone:", phone);
      
      // Format phone number to ensure consistent format
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      const email = `${formattedPhone.replace(/\+/g, '')}@phone.mymealplan.app`;
      
      console.log("Using formatted email:", email);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }
      
      console.log("Sign in successful");
      toast.success("Successfully logged in!");
      onSuccess();
    } catch (error: any) {
      console.error("Sign in error:", error);
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
        type="tel"
        placeholder="Phone Number (e.g. +1234567890)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      
      <FormInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="rememberMe"
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
        />
        <label
          htmlFor="rememberMe"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Loading..." : "Sign In"}
      </Button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onToggleForm}
          className="text-primary hover:underline"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
};