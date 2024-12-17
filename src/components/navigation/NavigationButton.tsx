import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const NavigationButton = ({ isOpen, onClick }: NavigationButtonProps) => (
  <Button
    variant="ghost"
    size="icon"
    className="fixed top-4 right-4 bg-white"
    onClick={onClick}
  >
    {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
  </Button>
);

export default NavigationButton;