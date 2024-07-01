import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL_PIPELINES } from '../config.tsx';
import TablePipelines from '../components/TablePipelines.tsx';

const PipelinesHistory: React.FC = () => {
  const [originsData, setOriginsData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL_PIPELINES);
        setOriginsData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='column-dbos-center' style={{ minHeight: '100vh', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F9F9F9' }}>
    <br />
    <h2 style={{marginBottom: '60px' }}>My Pipelines</h2>
    <TablePipelines  dataPoints={originsData}/>

  </div>
  );
};

export default PipelinesHistory;
