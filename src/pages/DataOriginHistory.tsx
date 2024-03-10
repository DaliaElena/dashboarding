import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableDataOriginsComplete from '../components/TableDataOriginsComplete';
import { API_URL_DATA } from '../config'; 


const DataOriginHistory: React.FC = () => {
  const [originsData, setOriginsData] = useState<{ Name: string; origin: string; lastConnection: string; }[]>([]);

  useEffect(() => {
    const fetchOriginsData = async () => {
      try {
        const response = await axios.get(API_URL_DATA, {
          headers: {
            'accept': 'application/json'
          }
        });
        setOriginsData(response.data);
        console.log(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOriginsData();
  }, []);

  return (
    <div className='column-dbos-center' style={{ minHeight: '100vh', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F9F9F9' }}>
      <br />
      <h2 style={{marginBottom: '60px' }}>Data Origin History</h2>
      {originsData.length > 0 ? (
        <TableDataOriginsComplete dataPoints={originsData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DataOriginHistory;
