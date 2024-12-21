import React from "react";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 mb-8">
      <img 
        src="/lovable-uploads/67003c76-1908-4b2f-93d3-01ea4a4cf510.png" 
        alt="MyMealPlan Logo" 
        className="h-24 w-auto"
      />
      <Navigation />
    </div>
  );
};

export default Header;