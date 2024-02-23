import { useCallback, useState } from 'react';
import { fetchFact } from './fetchFact.service';

export type CatFactType = {
  text: string;
  _id: string;
};

export const useFact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCatFact = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFact();
      setLoading(false);
      return data;
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setLoading(false);
        setError(error.message);
      }
    }
  }, []);

  return { loading, error, fetchFact: fetchCatFact };
};

export default useFact;
