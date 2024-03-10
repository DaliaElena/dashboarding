import { useState } from 'react';

const useDeleteAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null); // Explicitly define type as any or unknown

  const deleteData = async (url: string, origin: string, name: string) => {
    try {
      setIsLoading(true);
      const complete_url=`${url}?origin=${origin}?name=${name}`
      const response = await fetch(complete_url, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
      return await response.json();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteData, isLoading, error };
};

export default useDeleteAPI;
