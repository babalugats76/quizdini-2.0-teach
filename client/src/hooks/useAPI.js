import axios from 'axios';
import { useCallback } from 'react';

const useAPI = ({ url }) => {
  const get = useCallback(async () => {
    try {
      const res = await axios.get(url);
      return { data: res.data };
    } catch (err) {
      return {
        error: err.response.data
      };
    }
  }, [url]);

  const put = useCallback(
    async data => {
      try {
        const res = await axios.put(url, data);
        return { data: res.data };
      } catch (err) {
        return {
          error: err.response.data
        };
      }
    },
    [url]
  );

  const post = useCallback(
    async data => {
      try {
        const res = await axios.post(url, data);
        return { data: res.data };
      } catch (err) {
        return {
          error: err.response.data
        };
      }
    },
    [url]
  );

  return { GET: get, PUT: put, POST: post };
};

export default useAPI;
