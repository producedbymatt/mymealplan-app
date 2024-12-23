import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SignInFormProps {
  onSuccess: () => void;
  onToggleForm: () => void;
}

export const SignInForm = ({ onSuccess, onToggleForm }: SignInFormProps) => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);

    try {
      // Set the session persistence before signing in
      supabase.auth.setSession({
        access_token: '',
        refresh_token: '',
      });

      const { error } = await supabase.auth.signInWithPassword({
        email: `${phone}@placeholder.com`,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setAuthError("Incorrect phone number or password. Please try again.");
        } else {
          setAuthError(error.message);
        }
        return;
      }

      toast.success("Successfully logged in!");
      onSuccess();
    } catch (error: any) {
      setAuthError(error.message);
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
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      
      <div className="relative">
        <FormInput
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {authError && (
        <Alert variant="destructive">
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="rememberMe"
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
        />
        <label
          htmlFor="rememberMe"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
        >
          Remember me
        </label>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950" 
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign In"}
      </Button>

      <p className="text-center text-sm text-white">
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