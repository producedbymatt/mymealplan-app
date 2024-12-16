import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-6 text-center text-gray-600 text-sm">
      <p>© {currentYear} MyMealPlan.App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;