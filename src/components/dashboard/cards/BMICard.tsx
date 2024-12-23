import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BMISlider from "../BMISlider";
import BMICategories from "../BMICategories";
import LiquidBackground from "./LiquidBackground";

interface BMICardProps {
  bmi: number;
  mostRecentWeight: number;
  heightFeet: number;
  heightInches: number;
  height: number;
  gender?: "male" | "female";
  underweightWeight: number;
  normalWeight: number;
  overweightWeight: number;
  isAuthenticated?: boolean;
}

const getBMICategory = (bmi: number, gender: "male" | "female" = "male") => {
  if (gender === "female") {
    if (bmi < 18.5) return { 
      category: "Underweight", 
      color: "text-blue-500", 
      gradient: "bg-gradient-to-r from-blue-500/90 via-indigo-500/90 to-blue-500/90" 
    };
    if (bmi < 24) return { 
      category: "Normal weight", 
      color: "text-green-500", 
      gradient: "bg-gradient-to-r from-green-500/90 via-emerald-500/90 to-green-500/90" 
    };
    if (bmi < 29) return { 
      category: "Overweight", 
      color: "text-yellow-500", 
      gradient: "bg-gradient-to-r from-yellow-500/90 via-amber-500/90 to-yellow-500/90" 
    };
    return { 
      category: "Obese", 
      color: "text-red-500", 
      gradient: "bg-gradient-to-r from-red-500/90 via-orange-500/90 to-red-500/90" 
    };
  } else {
    if (bmi < 18.5) return { 
      category: "Underweight", 
      color: "text-blue-500", 
      gradient: "bg-gradient-to-r from-blue-500/90 via-indigo-500/90 to-blue-500/90" 
    };
    if (bmi < 25) return { 
      category: "Normal weight", 
      color: "text-green-500", 
      gradient: "bg-gradient-to-r from-green-500/90 via-emerald-500/90 to-green-500/90" 
    };
    if (bmi < 30) return { 
      category: "Overweight", 
      color: "text-yellow-500", 
      gradient: "bg-gradient-to-r from-yellow-500/90 via-amber-500/90 to-yellow-500/90" 
    };
    return { 
      category: "Obese", 
      color: "text-red-500", 
      gradient: "bg-gradient-to-r from-red-500/90 via-orange-500/90 to-red-500/90" 
    };
  }
};

const getDefaultGradient = () => {
  return "bg-gradient-to-r from-[#D3E4FD] via-[#0EA5E9] to-[#1EAEDB]";
};

const BMICard = ({ 
  bmi, 
  mostRecentWeight, 
  heightFeet, 
  heightInches, 
  height,
  gender,
  underweightWeight,
  normalWeight,
  overweightWeight,
  isAuthenticated = true
}: BMICardProps) => {
  const bmiCategory = getBMICategory(bmi, gender);
  const gradientClass = isAuthenticated ? bmiCategory.gradient : getDefaultGradient();

  return (
    <Card className="w-full border-none relative overflow-hidden">
      {/* Liquid background */}
      <LiquidBackground />
      
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      {/* Animated gradient background */}
      <div className={`absolute inset-0 ${gradientClass} animate-gradient-x`} />
      
      {/* Content */}
      <CardHeader className="text-center relative z-20">
        <CardTitle className="text-white">Current BMI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-20">
        <div className="text-center">
          <div className="text-3xl font-bold text-white">
            {isAuthenticated ? bmi.toFixed(1) : "N/A"}
          </div>
          <p className={`text-sm ${isAuthenticated ? bmiCategory.color : "text-blue-500"} font-semibold`}>
            {isAuthenticated ? `Category: ${bmiCategory.category}` : "Sign in to calculate your BMI"}
          </p>
          <p className="text-xs text-white mt-1">
            {isAuthenticated 
              ? `Based on current weight: ${mostRecentWeight} lbs, height: ${heightFeet}'${heightInches}"`
              : "Track your BMI and get personalized insights"}
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <BMISlider 
            bmi={bmi} 
            height={height}
            onBMIChange={() => {}}
          />
          
          <BMICategories
            underweightWeight={underweightWeight}
            normalWeight={normalWeight}
            overweightWeight={overweightWeight}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BMICard;