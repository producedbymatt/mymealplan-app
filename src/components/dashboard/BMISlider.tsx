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
  const [thumbPosition, setThumbPosition] = React.useState({ x: 0, y: 0 });
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    onBMIChange(value);
    
    // Update tooltip position after slider value changes
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const sliderRect = slider.getBoundingClientRect();
      const percentage = (value[0] - 15) / (40 - 15); // normalize value between min (15) and max (40)
      const x = percentage * sliderRect.width;
      setThumbPosition({ x, y: sliderRect.top });
    }
  };

  const simulatedWeight = calculateWeightFromBMI(sliderValue[0], height);
  
  // Calculate the position for the current BMI marker
  const currentBMIPercentage = ((bmi - 15) / (40 - 15)) * 100;

  return (
    <div className="relative pt-16" ref={sliderRef}>
      <Card 
        className="absolute -top-2 left-0 p-2 bg-white shadow-lg rounded-lg z-20 w-32"
        style={{ 
          transform: `translateX(${Math.max(0, Math.min(thumbPosition.x - 48, (sliderRef.current?.offsetWidth || 0) - 128))}px)`,
          transition: "transform 0.1s ease-out"
        }}
      >
        <div className="text-center text-sm">
          <div className="font-semibold">BMI: {sliderValue[0].toFixed(1)}</div>
          <div className="text-muted-foreground">{simulatedWeight} lbs</div>
        </div>
      </Card>
      <div className="relative">
        {/* Current BMI Marker */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary z-10"
          style={{ 
            left: `${currentBMIPercentage}%`,
            marginTop: "-2px"
          }}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-primary font-medium whitespace-nowrap">
            Current: {bmi.toFixed(1)}
          </div>
        </div>
        <Slider
          defaultValue={[bmi]}
          max={40}
          min={15}
          step={0.1}
          value={sliderValue}
          onValueChange={handleSliderChange}
          className="z-10 [&_.relative]:before:absolute [&_.relative]:before:inset-0 [&_.relative]:before:h-2 [&_.relative]:before:rounded-full [&_.relative]:before:bg-gradient-to-r [&_.relative]:before:from-blue-400 [&_.relative]:before:via-green-400 [&_.relative]:before:via-yellow-400 [&_.relative]:before:to-red-400 [&_[role=slider]]:z-20 [&_.relative]:bg-transparent [&_[class*=SliderRange]]:bg-transparent"
        >
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <ChevronDown className="h-4 w-4 text-primary" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default BMISlider;