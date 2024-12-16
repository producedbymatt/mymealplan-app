import { WeightEntry } from "@/hooks/useWeightLogs";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface WeightChartProps {
  entries: WeightEntry[];
}

const WeightChart = ({ entries }: WeightChartProps) => {
  return (
    <div className="h-[300px] w-full mb-6">
      {entries.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={entries}>
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
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