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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <h2 className="text-2xl font-bold text-center mb-6">Sign In or Sign Up for Free</h2>
      
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
      
      <FormInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" className="w-full" disabled={loading}>
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