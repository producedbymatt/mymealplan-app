import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AuthForm from "./AuthForm";

const AuthOverlay = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-[#1A1F2C] p-8 rounded-lg shadow-lg max-w-md w-full mx-4 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-4 text-white hover:text-white/80"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthOverlay;