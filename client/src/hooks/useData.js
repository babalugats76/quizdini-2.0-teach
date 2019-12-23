import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import axios from 'axios';

const useData = ({ url, deps = [], debug = false }) => {
  const isCancelled = useRef(false);

  const initialState = {
    data: null,
    error: null,
    getCount: 0,
    loading: false,
    requests: 0
  };

  const [state, setState] = useReducer((state, action) => {
    switch (action.type) {
      case 'BEGIN':
        return {
          ...state,
          error: null,
          loading: true
        };
      case 'SUCCESS':
        return {
          ...state,
          data: action.data,
          error: null,
          getCount: state.getCount + 1,
          loading: false,
          requests: state.requests + 1
        };
      case 'FAILURE':
        return {
          ...state,
          error: action.error,
          getCount: state.getCount + 1,
          loading: false,
          requests: state.requests + 1
        };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  }, initialState);

  const dispatch = useCallback(
    (...args) => {
      !isCancelled.current && setState(...args);
    },
    [isCancelled, setState]
  );

  const get = useCallback(async () => {
    try {
      dispatch({ type: 'BEGIN' });
      const res = await axios.get(url);
      const { data } = res;
      dispatch({ type: 'SUCCESS', data });
      return { data };
    } catch (err) {
      const { data: error } = err.response;
      dispatch({ type: 'FAILURE', error });
      return { error };
    }
  }, [dispatch, url]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  const initialized = useMemo(() => {
    return state.getCount > 0;
  }, [state.getCount]);

  useEffect(() => {
    get() && debug && console.log('fetching data...');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debug, get, ...deps]);

  useEffect(() => {
    return () => {
      debug && console.log('useData cleanup...');
      isCancelled.current = true;
    };
  }, [debug]);

  useEffect(() => {
    debug && console.log(JSON.stringify(state));
  }, [debug, state]);

  return {
    ...state,
    initialized,
    reset
  };
};

export default useData;
