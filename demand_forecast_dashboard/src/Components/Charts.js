import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 16,
          right: 16,
          bottom: 16,
          left: 24,
        }}
      >
        <XAxis dataKey="date" stroke="#ddd">
          <Label
            value="Date"
            offset={-10}
            position="insideBottom"
            style={{ fill: "#ddd" }}
          />
        </XAxis>
        <YAxis stroke="#ddd">
          <Label
            angle={270}
            position="left"
            style={{ textAnchor: "middle", fill: "#ddd" }}
          >
            Quantity (Tons)
          </Label>
        </YAxis>
        <Tooltip />
        <Legend />
        {/* Line for Inventory Level */}
        <Line
          type="monotone"
          dataKey="inventoryLevel"
          stroke="#ff7f0e"
          strokeWidth={2}
          dot={{ r: 4 }}
          isAnimationActive={false}
          connectNulls
        />
        {/* Line for Demand Level */}
        <Line
          type="monotone"
          dataKey="demandLevel"
          stroke="#1f77b4"
          strokeWidth={2}
          dot={{ r: 4 }}
          isAnimationActive={false}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
