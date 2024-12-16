import { useState } from "react";
import { SignUpForm } from "./SignUpForm";
import { SignInForm } from "./SignInForm";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSuccess = () => {
    // Handle successful authentication
    console.log("Authentication successful");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {isSignUp ? (
        <SignUpForm
          onSuccess={handleSuccess}
          onToggleForm={() => setIsSignUp(false)}
        />
      ) : (
        <SignInForm
          onSuccess={handleSuccess}
          onToggleForm={() => setIsSignUp(true)}
        />
      )}
    </div>
  );
}