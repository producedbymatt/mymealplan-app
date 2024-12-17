import { WeightEntry } from "@/hooks/useWeightLogs";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";

interface WeightChartProps {
  entries: WeightEntry[];
  height?: number;  // Optional height prop for the BMI markers
}

const WeightChart = ({ entries, height = 60 }: WeightChartProps) => {
  // Sort entries by date, oldest first
  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = new Date(a.created_at || "");
    const dateB = new Date(b.created_at || "");
    return dateA.getTime() - dateB.getTime();
  });

  // Format dates for display
  const formattedEntries = sortedEntries.map(entry => ({
    ...entry,
    date: format(new Date(entry.created_at || ""), 'MMM dd')
  }));

  // Calculate BMI category weights based on height
  const calculateWeightForBMI = (bmi: number) => {
    return (bmi * height * height) / 703;
  };

  const underweightThreshold = calculateWeightForBMI(18.5);
  const normalWeightThreshold = calculateWeightForBMI(24.9);
  const overweightThreshold = calculateWeightForBMI(29.9);

  // Custom tooltip to show BMI category
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const weight = payload[0].value;
      let category = "";
      if (weight < underweightThreshold) category = "Underweight";
      else if (weight < normalWeightThreshold) category = "Normal Weight";
      else if (weight < overweightThreshold) category = "Overweight";
      else category = "Obese";

      return (
        <div className="bg-white p-2 border rounded shadow-lg">
          <p className="text-sm">Weight: {weight} lbs</p>
          <p className="text-sm text-gray-600">Category: {category}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full mb-6">
      {entries.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedEntries} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={[80, 'auto']}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* BMI Category Reference Lines */}
            <ReferenceLine
              y={underweightThreshold}
              label={{ value: "Underweight < 18.5", position: 'left' }}
              stroke="#63B3ED"
              strokeDasharray="3 3"
            />
            <ReferenceLine
              y={normalWeightThreshold}
              label={{ value: "Normal Weight 18.5-24.9", position: 'left' }}
              stroke="#48BB78"
              strokeDasharray="3 3"
            />
            <ReferenceLine
              y={overweightThreshold}
              label={{ value: "Overweight 25-29.9", position: 'left' }}
              stroke="#ED8936"
              strokeDasharray="3 3"
            />
            
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#63B3ED"
              strokeWidth={2}
              dot={{ fill: "#63B3ED" }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          Log your weight to see your progress chart
        </div>
      )}
    </div>
  );
};

export default WeightChart;