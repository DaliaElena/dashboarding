import { useState } from 'react';

const useDeleteAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (url: string, name: string) => {
    try {
      setIsLoading(true);
      const complete_url=`${url}?name=${name}`
      const response = await fetch(complete_url, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
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
