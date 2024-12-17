import React from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

interface BMISliderProps {
  bmi: number;
  height: number;
  onBMIChange: (value: number[]) => void;
}

const calculateWeightFromBMI = (bmi: number, height: number) => {
  return Math.round((bmi * height * height) / 703);
};

const BMISlider = ({ bmi, height, onBMIChange }: BMISliderProps) => {
  const [sliderValue, setSliderValue] = React.useState([bmi]);
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    onBMIChange(value);
  };

  const simulatedWeight = calculateWeightFromBMI(sliderValue[0], height);

  return (
    <div className="relative pt-16">
      {showTooltip && (
        <Card className="absolute -top-2 left-1/2 transform -translate-x-1/2 p-2 bg-white shadow-lg rounded-lg z-20 w-32">
          <div className="text-center text-sm">
            <div className="font-semibold">BMI: {sliderValue[0].toFixed(1)}</div>
            <div className="text-muted-foreground">{simulatedWeight} lbs</div>
          </div>
        </Card>
      )}
      <Slider
        defaultValue={[bmi]}
        max={40}
        min={15}
        step={0.1}
        value={sliderValue}
        onValueChange={handleSliderChange}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="z-10 [&_.relative]:before:absolute [&_.relative]:before:inset-0 [&_.relative]:before:h-2 [&_.relative]:before:rounded-full [&_.relative]:before:bg-gradient-to-r [&_.relative]:before:from-blue-400 [&_.relative]:before:via-green-400 [&_.relative]:before:via-yellow-400 [&_.relative]:before:to-red-400 [&_[role=slider]]:z-20 [&_.relative]:bg-transparent [&_[class*=SliderRange]]:bg-transparent"
      >
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="h-4 w-4 text-primary" />
        </div>
      </Slider>
    </div>
  );
};

export default BMISlider;