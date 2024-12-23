import React from "react";
import AuthForm from "@/components/auth/AuthForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AuthSection = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col">
      <div className="container mx-auto px-4 flex-grow">
        <Header />
        <h1 className="text-4xl font-bold text-center mb-4">
          Your Goals, Your Meals, Your Plan.
        </h1>
        <p className="text-lg text-white text-center mb-8 max-w-3xl mx-auto">
          Calculate your recommended daily calorie and protein intake, get a custom meal plan designed to meet your goals, and track your progress.
        </p>

        <div className="mb-12 bg-white rounded-lg shadow-md p-6">
          <AuthForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthSection;