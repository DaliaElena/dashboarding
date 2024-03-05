import { useState, useEffect } from 'react';
import { API_URL_CHART } from '../config'; 


const useChartData = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL_CHART, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();

    // Clean up function
    return () => {
      // Perform any necessary cleanup here
    };
  }, []); // Empty dependency array to fetch data only once on component mount

  return chartData;
};

export default useChartData;
