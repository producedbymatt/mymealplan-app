import { Link } from "react-router-dom";
import { Gauge, Weight, ClipboardList, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationMenuProps {
  onClose: () => void;
  onSignOut: () => void;
  session: any;
}

const NavigationMenu = ({ onClose, onSignOut, session }: NavigationMenuProps) => {
  const menuItems = [
    { to: "/", icon: Gauge, label: "Dashboard" },
    { to: "/calorie-logger", icon: ClipboardList, label: "Calorie Logger" },
    { to: "/weight-tracking", icon: Weight, label: "Weight Tracking" },
    { to: "/profile", icon: UserCircle, label: "Profile" },
  ];

  return (
    <div className="flex flex-col p-4">
      {menuItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="px-4 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
          onClick={onClose}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
      <Button
        variant={session ? "ghost" : "default"}
        className={session ? "mt-4 text-red-600 hover:text-red-700 hover:bg-red-50" : "mt-4"}
        onClick={() => {
          if (session) {
            onSignOut();
          }
          onClose();
        }}
      >
        {session ? "Sign Out" : "Sign In"}
      </Button>
    </div>
  );
};

export default NavigationMenu;