import React from "react";
import EditMetricsForm from "@/components/profile/EditMetricsForm";
import UserMetricsCard from "@/components/profile/UserMetricsCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col">
      <div className="container mx-auto px-4 flex-grow">
        <Header />
        <h1 className="text-3xl font-bold text-center mb-8">Profile</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <UserMetricsCard />
          <EditMetricsForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;