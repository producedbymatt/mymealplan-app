import { WeightEntry } from "@/hooks/useWeightLogs";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";

interface WeightChartProps {
  entries: WeightEntry[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-2 bg-blue-950 shadow-lg rounded-lg">
        <div className="text-center text-sm">
          <div className="font-semibold text-white">{label}</div>
          <div className="text-white">{payload[0].value} lbs</div>
        </div>
      </Card>
    );
  }
  return null;
};

const WeightChart = ({ entries }: WeightChartProps) => {
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

  return (
    <div className="h-[300px] w-full mb-6">
      {entries.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedEntries}>
            <XAxis 
              dataKey="date"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={["auto", "auto"]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#374151' }}
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