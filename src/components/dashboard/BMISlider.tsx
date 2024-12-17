import React from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

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
  const [isInteracting, setIsInteracting] = React.useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const resetTimeoutRef = React.useRef<NodeJS.Timeout>();

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    onBMIChange(value);
    
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const sliderRect = slider.getBoundingClientRect();
      const percentage = (value[0] - 15) / (40 - 15);
      const x = percentage * sliderRect.width;
      setThumbPosition({ x, y: sliderRect.top });
    }

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
  };

  const startInteraction = () => {
    setIsInteracting(true);
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
  };

  const endInteraction = () => {
    setIsInteracting(false);
    resetTimeoutRef.current = setTimeout(() => {
      setSliderValue([bmi]);
      onBMIChange([bmi]);
    }, 1000);
  };

  React.useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const simulatedWeight = calculateWeightFromBMI(sliderValue[0], height);

  return (
    <div 
      className="relative" 
      ref={sliderRef}
      onMouseEnter={startInteraction}
      onMouseLeave={endInteraction}
      onTouchStart={startInteraction}
      onTouchEnd={endInteraction}
    >
      <Card 
        className={`absolute -top-16 left-0 p-2 bg-white shadow-lg rounded-lg z-20 w-32 transition-opacity duration-200 ${
          isInteracting ? 'opacity-100' : 'opacity-0'
        }`}
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

      <Slider
        defaultValue={[bmi]}
        max={40}
        min={15}
        step={0.1}
        value={sliderValue}
        onValueChange={handleSliderChange}
        className="z-10 [&_.relative]:before:absolute [&_.relative]:before:inset-0 [&_.relative]:before:h-2 [&_.relative]:before:rounded-full [&_.relative]:before:bg-gradient-to-r [&_.relative]:before:from-blue-400 [&_.relative]:before:via-green-400 [&_.relative]:before:via-yellow-400 [&_.relative]:before:to-red-400 [&_[role=slider]]:z-20 [&_.relative]:bg-transparent [&_[class*=SliderRange]]:bg-transparent"
      />
    </div>
  );
};

export default BMISlider;