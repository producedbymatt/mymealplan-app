import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const BMICard = ({ 
  bmi, 
  mostRecentWeight, 
  heightFeet, 
  heightInches, 
  height,
  gender,
  underweightWeight,
  normalWeight,
  overweightWeight 
}: BMICardProps) => {
  const bmiCategory = getBMICategory(bmi, gender);

  return (
    <Card className={`w-full border-none relative overflow-hidden`}>
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      {/* Animated gradient background */}
      <div className={`absolute inset-0 ${bmiCategory.gradient} animate-gradient-x`} />
      
      {/* Content */}
      <CardHeader className="text-center relative z-20">
        <CardTitle className="text-white">Current BMI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-20">
        <div className="text-center">
          <div className="text-3xl font-bold text-white">{bmi.toFixed(1)}</div>
          <p className={`text-sm ${bmiCategory.color} font-semibold`}>
            Category: {getBMICategory(bmi, gender).category}
          </p>
          <p className="text-xs text-white mt-1">
            Based on current weight: {mostRecentWeight} lbs, height: {heightFeet}'{heightInches}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BMICard;