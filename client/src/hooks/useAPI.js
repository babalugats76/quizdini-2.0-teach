import axios from 'axios';
import { useCallback, useEffect } from 'react';

axios.defaults.headers.common[
  'quizdini-timezone'
] = Intl.DateTimeFormat().resolvedOptions().timeZone;

const useAPI = ({ url, debug = true }) => {
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

  useEffect(() => {
    return () => {
      debug && console.log('useAPI cleanup...');
    };
  }, [debug]);

  return { GET: get, PUT: put, POST: post };
};

export default useAPI;
