import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ChartWorkerProps {
  dataPoints: { x: string; y: number }[];
}

const ChartWorker: React.FC<ChartWorkerProps> = ({ dataPoints }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <BarChart width={600} height={300} data={dataPoints} margin={{ top: 0, right: 0, left: 0, bottom: 15 }}>
        <XAxis dataKey="x" name="Eje X" label={{ value: "Workers", position: "insideBottom", offset: -10 }} />
        <YAxis name="Eje Y" label={{ value: "Success", angle: -90, position: "insideLeft" }} />
        <CartesianGrid stroke="lightgray" strokeDasharray="2 5" />
        <Bar dataKey="y" fill="orange" />
      </BarChart>
    </div>
  );
};

export default ChartWorker;
