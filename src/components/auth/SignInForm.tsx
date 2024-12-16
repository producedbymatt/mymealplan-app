import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import { toast } from "sonner";

interface SignInFormProps {
  onSuccess: () => void;
  onToggleForm: () => void;
}

export const SignInForm = ({ onSuccess, onToggleForm }: SignInFormProps) => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: `${phone}@placeholder.com`,
        password,
      });

      if (error) throw error;
      toast.success("Successfully logged in!");
      onSuccess();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
      
      <FormInput
        type="tel"
        placeholder="Phone Number"
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