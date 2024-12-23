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

const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
  if (bmi < 24) return { category: "Normal", color: "text-green-500" };
  if (bmi < 29) return { category: "Overweight", color: "text-yellow-500" };
  return { category: "Obese", color: "text-red-500" };
};

const BMISlider = ({ bmi, height, onBMIChange }: BMISliderProps) => {
  const constrainedBMI = Math.max(15, Math.min(40, bmi));
  const [sliderValue, setSliderValue] = React.useState([constrainedBMI]);
  const [isInteracting, setIsInteracting] = React.useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const resetTimeoutRef = React.useRef<NodeJS.Timeout>();
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });

  const updateTooltipPosition = (value: number = sliderValue[0]) => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const sliderRect = slider.getBoundingClientRect();
      const percentage = (value - 15) / (40 - 15);
      const x = percentage * sliderRect.width;
      setTooltipPosition({ x, y: sliderRect.top });
    }
  };

  React.useEffect(() => {
    updateTooltipPosition(constrainedBMI);
    const handleResize = () => updateTooltipPosition();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [constrainedBMI]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    onBMIChange(value);
    updateTooltipPosition(value[0]);
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
      setSliderValue([constrainedBMI]);
      onBMIChange([constrainedBMI]);
    }, 1000);
  };

  const simulatedWeight = calculateWeightFromBMI(sliderValue[0], height);
  const bmiCategory = getBMICategory(sliderValue[0]);
  
  const currentBMIPercentage = Math.max(0, Math.min(100, ((constrainedBMI - 15) / (40 - 15)) * 100));

  const getMarkerOffset = () => {
    if (currentBMIPercentage > 85) {
      return '-100%';
    } else if (currentBMIPercentage < 15) {
      return '0';
    }
    return '-50%';
  };

  return (
    <div 
      className="relative pt-16" 
      ref={sliderRef}
      onMouseEnter={startInteraction}
      onMouseLeave={endInteraction}
      onTouchStart={startInteraction}
      onTouchEnd={endInteraction}
    >
      <Card 
        className={`absolute -top-2 p-2 bg-blue-950 shadow-lg rounded-lg z-20 w-36 transition-opacity duration-200 ${
          isInteracting ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          left: `${tooltipPosition.x}px`,
          transform: 'translateX(-50%)',
          transition: "left 0.1s ease-out"
        }}
      >
        <div className="text-center text-sm">
          <div className="font-semibold text-white">BMI: {sliderValue[0].toFixed(1)}</div>
          <div className="text-white">{simulatedWeight} lbs</div>
          <div className={`text-xs font-medium ${bmiCategory.color}`}>
            {bmiCategory.category}
          </div>
        </div>
      </Card>
      <div className="relative">
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-1 h-8 bg-primary z-10 shadow-md"
          style={{ 
            left: `${currentBMIPercentage}%`,
            marginTop: "-2px",
            background: "rgb(30, 58, 138)"
          }}
        >
          <div 
            className="absolute -top-7 bg-blue-950 text-white px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap shadow-sm"
            style={{ 
              left: '50%',
              transform: `translateX(${getMarkerOffset()})`,
            }}
          >
            Current: {bmi.toFixed(1)}
          </div>
        </div>
        <Slider
          defaultValue={[constrainedBMI]}
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