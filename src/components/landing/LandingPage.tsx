import AuthForm from "@/components/auth/AuthForm";

const LandingPage = () => (
  <div className="min-h-screen bg-gray-50 py-8 flex flex-col">
    <div className="container mx-auto px-4 flex-grow">
      <img 
        src="/lovable-uploads/67003c76-1908-4b2f-93d3-01ea4a4cf510.png" 
        alt="MyMealPlan Logo" 
        className="mx-auto mb-6 h-24 w-auto"
      />
      <h1 className="text-4xl font-bold text-center mb-4">
        MyMealPlan.App
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
        Track your weight loss journey, calculate your recommended daily calorie and protein intake, and get a custom meal plan designed to meet your goals.
      </p>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Sign Up for Free</h2>
        <p className="text-gray-600 mt-2">
          Create an account to unlock all features including weight tracking, BMI calculation, and personalized meal plans.
        </p>
      </div>
      <AuthForm />
    </div>
  </div>
);

export default LandingPage;