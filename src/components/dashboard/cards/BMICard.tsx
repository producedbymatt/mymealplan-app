import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BMISlider from "../BMISlider";
import BMICategories from "../BMICategories";
import { useState } from "react";

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
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500", gradient: "bg-gradient-to-r from-blue-50 to-indigo-50" };
    if (bmi < 24) return { category: "Normal weight", color: "text-green-500", gradient: "bg-gradient-to-r from-green-50 to-emerald-50" };
    if (bmi < 29) return { category: "Overweight", color: "text-yellow-500", gradient: "bg-gradient-to-r from-yellow-50 to-amber-50" };
    return { category: "Obese", color: "text-red-500", gradient: "bg-gradient-to-r from-red-50 to-orange-50" };
  } else {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500", gradient: "bg-gradient-to-r from-blue-50 to-indigo-50" };
    if (bmi < 25) return { category: "Normal weight", color: "text-green-500", gradient: "bg-gradient-to-r from-green-50 to-emerald-50" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500", gradient: "bg-gradient-to-r from-yellow-50 to-amber-50" };
    return { category: "Obese", color: "text-red-500", gradient: "bg-gradient-to-r from-red-50 to-orange-50" };
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
  const [simulatedBMI, setSimulatedBMI] = useState<number | null>(null);
  const bmiCategory = getBMICategory(bmi, gender);

  return (
    <Card className={`w-full border-none ${bmiCategory.gradient}`}>
      <CardHeader className="text-center">
        <CardTitle>Current BMI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold">{bmi.toFixed(1)}</div>
          <p className={`text-sm ${bmiCategory.color} font-semibold mt-1`}>
            Category: {getBMICategory(bmi, gender).category}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Based on current weight: {mostRecentWeight} lbs, height: {heightFeet}'{heightInches}"
          </p>
        </div>

        <div className="relative mt-8 space-y-6">
          {/* Current BMI Label */}
          <div 
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white px-3 py-1 rounded-full text-sm"
            style={{ 
              left: `${((bmi - 15) / (40 - 15)) * 100}%`,
              zIndex: 10 
            }}
          >
            Current: {bmi.toFixed(1)}
          </div>

          <BMISlider 
            bmi={bmi} 
            height={height}
            onBMIChange={(value) => setSimulatedBMI(value[0])}
          />
          
          {/* Category Brackets */}
          <div className="grid grid-cols-4 text-xs text-center gap-1 relative">
            <div className="border-l-2 border-t-2 border-r-2 border-blue-400 pt-2 rounded-t-lg">
              <p className="text-blue-500 font-semibold">Underweight</p>
              <p className="text-muted-foreground">&lt;{underweightWeight}lbs</p>
            </div>
            <div className="border-t-2 border-r-2 border-green-400 pt-2 rounded-tr-lg">
              <p className="text-green-500 font-semibold">Normal</p>
              <p className="text-muted-foreground">{underweightWeight}-{normalWeight}lbs</p>
            </div>
            <div className="border-t-2 border-r-2 border-yellow-500 pt-2 rounded-tr-lg">
              <p className="text-yellow-500 font-semibold">Overweight</p>
              <p className="text-muted-foreground">{normalWeight}-{overweightWeight}lbs</p>
            </div>
            <div className="border-t-2 border-r-2 border-red-500 pt-2 rounded-tr-lg">
              <p className="text-red-500 font-semibold">Obese</p>
              <p className="text-muted-foreground">&gt;{overweightWeight}lbs</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BMICard;