import React, { useState, useEffect } from "react";

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initial dark mode state
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    // Watch for class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const htmlElement = document.documentElement;
          setIsDarkMode(htmlElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="mt-auto py-6 text-center mx-8">
      <img 
        src={isDarkMode 
          ? "/lovable-uploads/f6662a44-ab76-41ca-890b-b9da00a755af.png"  // White logo for dark mode
          : "/lovable-uploads/67003c76-1908-4b2f-93d3-01ea4a4cf510.png"  // Original logo for light mode
        }
        alt="MyMealPlan Logo" 
        className="mx-auto mb-4 h-12 w-auto"
      />
      <p className="text-gray-600 text-sm">
        © 2024 Matthew Campbell | MyMealPlan.App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;