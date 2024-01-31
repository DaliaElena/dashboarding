import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface ChartWorkerProps {
  dataPoints: { x: string; y: number }[];
}

const ChartWorker: React.FC<ChartWorkerProps> = ({ dataPoints }) => {
  return (
    <BarChart width={600} height={300} data={dataPoints} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="x" name="Eje X" label={{ value: "Workers", position: "insideBottom", offset: -10 }} />
      <YAxis name="Eje Y" label={{ value: "Success", angle: -90, position: "insideLeft" }} />
      <CartesianGrid stroke="lightgray" strokeDasharray="2 5" />
      <Tooltip />
      <Bar dataKey="y" fill="orange" />
    </BarChart>
  );
};

export default ChartWorker;
