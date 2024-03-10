import { useEffect, useState } from 'react';

const useAPIGET = (url: string) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();

  }, [url]); 

  return apiData;
};

export default useAPIGET;
