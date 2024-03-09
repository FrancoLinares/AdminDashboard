import { useEffect, useState } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return;

        setData(res);
        setLoading(false);
      });
  }, []);

  return {
    data,
    loading
  };
}
