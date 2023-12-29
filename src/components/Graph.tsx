import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

import { StockData } from "../types/stockData";

type GraphProps = {
  historicalPrices: StockData[];
};

const Graph = ({ historicalPrices }: GraphProps) => (
  <div className="w-full">
    <ResponsiveContainer width="100%" height={550}>
      <LineChart
        data={historicalPrices}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="t" />
        <YAxis dataKey="p" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="p"
          stroke="#1db954"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default Graph;
