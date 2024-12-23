import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { updateUserMetrics } from "@/utils/metricsUtils";

interface BMICalculatorProps {
  onBMICalculated: (bmi: number) => void;
  onMetricsUpdate: (height: number, weight: number) => void;
}

const BMICalculator = ({ onBMICalculated, onMetricsUpdate }: BMICalculatorProps) => {
  const [feet, setFeet] = React.useState("");
  const [inches, setInches] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [gender, setGender] = React.useState<"male" | "female">("male");
  const [bmi, setBMI] = React.useState<number | null>(null);
  const [isOpen, setIsOpen] = React.useState(() => {
    const stored = localStorage.getItem("bmiCalculatorOpen");
    return stored === null ? true : stored === "true";
  });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("bmiCalculatorOpen", isOpen.toString());
  }, [isOpen]);

  const calculateBMI = async (e: React.FormEvent) => {
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
    
    // Update metrics in the database
    await updateUserMetrics(heightInInches, weightInPounds, gender);
  };

  const getBMICategory = (bmi: number, gender: "male" | "female") => {
    if (gender === "female") {
      if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
      if (bmi < 24) return { category: "Normal weight", color: "text-green-500" };
      if (bmi < 29) return { category: "Overweight", color: "text-yellow-500" };
      return { category: "Obese", color: "text-red-500" };
    } else {
      if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
      if (bmi < 25) return { category: "Normal weight", color: "text-green-500" };
      if (bmi < 30) return { category: "Overweight", color: "text-yellow-500" };
      return { category: "Obese", color: "text-red-500" };
    }
  };

  return (
    <Card className="w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold">BMI Calculator</h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="hover:bg-[#0EA5E9] hover:text-white">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="px-6 pb-6">
          <form onSubmit={calculateBMI} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-1">Gender</label>
              <RadioGroup
                defaultValue={gender}
                onValueChange={(value) => setGender(value as "male" | "female")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
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
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950">
              Calculate BMI
            </Button>
          </form>
          {bmi && (
            <div className="mt-4 text-center">
              <p className="text-lg">
                Your BMI: <span className="font-bold">{bmi.toFixed(1)}</span>
              </p>
              <p className={`${getBMICategory(bmi, gender).color} font-medium`}>
                Category: {getBMICategory(bmi, gender).category}
              </p>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default BMICalculator;
