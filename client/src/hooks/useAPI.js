import { useCallback, useEffect } from 'react';
import axios from 'axios';

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
    async (data, id = null) => {
      try {
        const path = url + (id ? `/${id}` : '');
        const res = await axios.put(path, data);
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
    async (data, id = null) => {
      try {
        const path = url + (id ? `/${id}` : '');
        const res = await axios.post(path, data);
        return { data: res.data };
      } catch (err) {
        return {
          error: err.response.data
        };
      }
    },
    [url]
  );

  const remove = useCallback(
    async id => {
      try {
        const path = url + '/' + id;
        const res = await axios.delete(path);
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

  return { GET: get, PUT: put, POST: post, DELETE: remove };
};

export default useAPI;
