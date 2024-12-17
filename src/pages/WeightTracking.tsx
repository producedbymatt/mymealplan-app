import React from "react";
import WeightTracker from "@/components/WeightTracker";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const WeightTracking = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col">
      <div className="container mx-auto px-4 flex-grow">
        <Header />
        <h1 className="text-3xl font-bold text-center mb-8">Weight Tracking</h1>
        <WeightTracker />
      </div>
      <Footer />
    </div>
  );
};

export default WeightTracking;