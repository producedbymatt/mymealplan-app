import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BMISlider from "../BMISlider";
import BMICategories from "../BMICategories";

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
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500", gradient: "bg-gradient-to-br from-blue-500/50 to-indigo-500/70" };
    if (bmi < 24) return { category: "Normal weight", color: "text-green-500", gradient: "bg-gradient-to-br from-green-500/50 to-emerald-500/70" };
    if (bmi < 29) return { category: "Overweight", color: "text-yellow-500", gradient: "bg-gradient-to-br from-yellow-500/50 to-amber-500/70" };
    return { category: "Obese", color: "text-red-500", gradient: "bg-gradient-to-br from-red-500/50 to-orange-500/70" };
  } else {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500", gradient: "bg-gradient-to-br from-blue-500/50 to-indigo-500/70" };
    if (bmi < 25) return { category: "Normal weight", color: "text-green-500", gradient: "bg-gradient-to-br from-green-500/50 to-emerald-500/70" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500", gradient: "bg-gradient-to-br from-yellow-500/50 to-amber-500/70" };
    return { category: "Obese", color: "text-red-500", gradient: "bg-gradient-to-br from-red-500/50 to-orange-500/70" };
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
    <Card className={`w-full border-none ${bmiCategory.gradient}`}>
      <CardHeader className="text-center">
        <CardTitle>Current BMI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{bmi.toFixed(1)}</div>
          <p className={`text-sm ${bmiCategory.color} font-semibold`}>
            Category: {getBMICategory(bmi, gender).category}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Based on current weight: {mostRecentWeight} lbs, height: {heightFeet}'{heightInches}"
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