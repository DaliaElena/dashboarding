import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ChartWorkerProps {
  dataPoints: { Name: string; Invocations: number }[];
}

const ChartWorker: React.FC<ChartWorkerProps> = ({ dataPoints }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <BarChart width={600} height={300} data={dataPoints} margin={{ top: 0, right: 0, left: 0, bottom: 15 }}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFCFE" />
            <stop offset="50%" stopColor="#FFB2F0" />
            <stop offset="100%" stopColor="#996B90" />
          </linearGradient>
        </defs>
        <XAxis dataKey="Name" name="Eje X" label={{ value: "Workers", position: "insideBottom", offset: -10 }} />
        <YAxis name="Eje Y" label={{ value: "Executions", angle: -90, position: "insideLeft" }} />
        <CartesianGrid stroke="lightgray" strokeDasharray="2 5" />
        <Bar dataKey="Invocations" fill="url(#grad1)" />
        
      </BarChart>
    </div>
  );
};

export default ChartWorker;
