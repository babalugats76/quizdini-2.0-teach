import axios from 'axios';
import { useCallback } from 'react';

const useAPI = ({ url }) => {
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

  return [post];
};

export default useAPI;
