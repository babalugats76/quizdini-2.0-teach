import axios from 'axios';
import { useCallback, useEffect, useReducer, useRef } from 'react';

axios.defaults.headers.common[
  'quizdini-timezone'
] = Intl.DateTimeFormat().resolvedOptions().timeZone;

// TODO - remove loading in lieu of local solutions

const useAPI = ({ url, debug = true }) => {
  const isCancelled = useRef(false);

  const initialState = {
    loading: false
  };

  const [state, setState] = useReducer((state, action) => {
    switch (action.type) {
      case 'BEGIN':
        return {
          ...state,
          loading: true
        };
      case 'END':
        return {
          ...state,
          loading: false
        };
      default:
        return state;
    }
  }, initialState);

  const dispatch = (...args) => !isCancelled.current && setState(...args);

  const get = useCallback(async () => {
    try {
      dispatch({ type: 'BEGIN' });
      const res = await axios.get(url);
      dispatch({ type: 'END' });
      return { data: res.data };
    } catch (err) {
      dispatch({ type: 'END' });
      return {
        error: err.response.data
      };
    }
  }, [url]);

  const put = useCallback(
    async data => {
      try {
        dispatch({ type: 'BEGIN' });
        const res = await axios.put(url, data);
        dispatch({ type: 'END' });
        return { data: res.data };
      } catch (err) {
        dispatch({ type: 'END' });
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
        dispatch({ type: 'BEGIN' });
        const res = await axios.post(url, data);
        dispatch({ type: 'END' });
        return { data: res.data };
      } catch (err) {
        dispatch({ type: 'END' });
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
      isCancelled.current = true;
    };
  }, [debug]);

  useEffect(() => {
    debug && console.log(JSON.stringify(state));
  }, [state, debug]);

  return { GET: get, PUT: put, POST: post, loading: state.loading };
};

export default useAPI;
