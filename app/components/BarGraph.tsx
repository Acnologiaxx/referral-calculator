import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

interface BarGraphProps {
  data: Array<{ name: string; income: number }>;
}

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  const formatLabel = (value: number) => `$${value.toFixed(0)}`;

  return (
    <div className="font-sans p-4 font-system" style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" className="font-inter-regular" axisLine={false} tickLine={false} />
          <Bar dataKey="income" barSize={40}>
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={
                  entry.name === data[data.length - 1].name
                    ? "#AFCC54"
                    : "#CFD6DF"
                }
              />
            ))}
            <LabelList
              dataKey="income"
              position="top"
              fill="#6B7280"
              className="font-system"
              formatter={formatLabel}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
