import React from "react";

interface BMICategoriesProps {
  underweightWeight: number;
  normalWeight: number;
  overweightWeight: number;
}

const BMICategories = ({ underweightWeight, normalWeight, overweightWeight }: BMICategoriesProps) => {
  return (
    <div className="grid grid-cols-4 text-xs text-center gap-1">
      <div>
        <p className="text-blue-500 font-semibold">Underweight</p>
        <p className="text-muted-foreground">&lt;{underweightWeight}lbs</p>
      </div>
      <div>
        <p className="text-green-500 font-semibold">Normal</p>
        <p className="text-muted-foreground">{underweightWeight}-{normalWeight}lbs</p>
      </div>
      <div>
        <p className="text-yellow-500 font-semibold">Overweight</p>
        <p className="text-muted-foreground">{normalWeight}-{overweightWeight}lbs</p>
      </div>
      <div>
        <p className="text-red-500 font-semibold">Obese</p>
        <p className="text-muted-foreground">&gt;{overweightWeight}lbs</p>
      </div>
    </div>
  );
};

export default BMICategories;