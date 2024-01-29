import React from 'react';
import { useRef, useEffect } from 'react';
import {CanvasJSChart} from 'canvasjs-react-charts'

// Add type declarations for props and chart reference
interface ChartWorkersProps {
  dataPoints: Array<{ x: number, y: number, color?: string }>;
}

interface ChartRef {
  render: () => void;
  // Add other methods or properties if needed
}

const ChartWorkers: React.FC<ChartWorkersProps> = ({ dataPoints }) => {
  const chartRef = useRef<ChartRef | null>(null);

  // Assign colors based on the range of values
  const blueShades = ['#FFBB4F', '#FF9E18'];
  dataPoints.forEach((dataPoint, index) => {
    dataPoint.color = blueShades[index % blueShades.length];
  });

  const generateStripLines = () => {
    const lines = [];
    for (let i = 5; i <= 100; i += 5) {
      lines.push({
        value: i,
        thickness: 1,
        color: '#E0E0E0',
      });
    }
    return lines;
  };

  const options = {
    animationEnabled: true,
    theme: 'light2',
    axisY: {
      title: 'Success Events',
      titleFontColor: '#969696',
      lineColor: '#E0E0E0',
      stripLines: generateStripLines(),
      labelPlacement: 'outside',
    },
    axisX: {
      title: 'Workers',
      titleFontColor: '#969696',
      interval: 1,
    },
    data: [
      {
        type: 'column',
        dataPoints: dataPoints,
        indexLabel: '{y}',
        indexLabelFontColor: '',
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.render();
    }
  }, [dataPoints]);

  return (
   <div style={{ maxWidth: '90vw', margin: 'auto', maxHeight: '50vh' }}>
      <CanvasJSChart options={options} onRef={(ref: ChartRef | null) => (chartRef.current = ref)} />
    </div>
  );
};

export default ChartWorkers;
