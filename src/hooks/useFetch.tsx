import { useState, useEffect } from "react";

type FetchReturnType<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

const useFetch = <T,>(url: string): FetchReturnType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        // Explicitly declare err as an Error type
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred."));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
