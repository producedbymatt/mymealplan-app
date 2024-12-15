import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BMICalculatorProps {
  onBMICalculated: (bmi: number) => void;
  onMetricsUpdate: (height: number, weight: number) => void;
}

const BMICalculator = ({ onBMICalculated, onMetricsUpdate }: BMICalculatorProps) => {
  const [feet, setFeet] = React.useState("");
  const [inches, setInches] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [bmi, setBMI] = React.useState<number | null>(null);
  const { toast } = useToast();

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const heightInInches = parseInt(feet) * 12 + parseInt(inches);
    const weightInPounds = parseFloat(weight);
    
    if (isNaN(heightInInches) || isNaN(weightInPounds)) {
      toast({
        title: "Invalid Input",
        description: "Please select your height and enter a valid weight.",
        variant: "destructive",
      });
      return;
    }

    // BMI Formula for imperial units: (weight in pounds * 703) / (height in inches)²
    const calculatedBMI = (weightInPounds * 703) / (heightInInches * heightInInches);
    setBMI(calculatedBMI);
    onBMICalculated(calculatedBMI);
    onMetricsUpdate(heightInInches, weightInPounds);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { category: "Normal weight", color: "text-green-500" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500" };
    return { category: "Obese", color: "text-red-500" };
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">BMI Calculator</h2>
      <form onSubmit={calculateBMI} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1">Height</label>
          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={feet} onValueChange={setFeet}>
                <SelectTrigger>
                  <SelectValue placeholder="Feet" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {Array.from({ length: 8 }, (_, i) => i + 4).map((foot) => (
                    <SelectItem key={foot} value={foot.toString()}>
                      {foot} ft
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={inches} onValueChange={setInches}>
                <SelectTrigger>
                  <SelectValue placeholder="Inches" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {Array.from({ length: 12 }, (_, i) => i).map((inch) => (
                    <SelectItem key={inch} value={inch.toString()}>
                      {inch} in
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Weight (lbs)</label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          Calculate BMI
        </Button>
      </form>
      {bmi && (
        <div className="mt-4 text-center">
          <p className="text-lg">
            Your BMI: <span className="font-bold">{bmi.toFixed(1)}</span>
          </p>
          <p className={`${getBMICategory(bmi).color} font-medium`}>
            Category: {getBMICategory(bmi).category}
          </p>
        </div>
      )}
    </Card>
  );
};

export default BMICalculator;