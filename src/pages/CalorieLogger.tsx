import React from "react";
import MealForm from "@/components/MealForm";
import MealsTable from "@/components/calories/MealsTable";
import CaloriesSummaryCard from "@/components/calories/CaloriesSummaryCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const CalorieLogger = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col">
      <div className="container mx-auto px-4 flex-grow">
        <Header />
        <h1 className="text-3xl font-bold text-center mb-8">Calorie Logger</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <MealForm />
          </div>
          <div>
            <CaloriesSummaryCard />
          </div>
        </div>
        <div className="mt-8">
          <MealsTable />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalorieLogger;