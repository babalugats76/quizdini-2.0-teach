import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import axios from 'axios';

const useData = ({ url, loadOnMount = false, debug = false }) => {
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
      case 'GET_BEGIN':
        return {
          ...state,
          error: null,
          loading: true
        };
      case 'GET_SUCCESS':
        return {
          ...state,
          data: action.data,
          error: null,
          getCount: state.getCount + 1,
          loading: false,
          requests: state.requests + 1
        };
      case 'GET_FAILURE':
        return {
          ...state,
          error: action.error,
          getCount: state.getCount + 1,
          loading: false,
          requests: state.requests + 1
        };
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
      dispatch({ type: 'GET_BEGIN' });
      const res = await axios.get(url);
      const { data } = res;
      dispatch({ type: 'GET_SUCCESS', data });
      return { data };
    } catch (err) {
      const { data: error } = err.response;
      dispatch({ type: 'GET_FAILURE', error });
      return { error };
    }
  }, [dispatch, url]);

  const initialized = useMemo(() => {
    return state.getCount > 0;
  }, [state.getCount]);

  useEffect(() => {
    debug && console.log('mount effect fired...');
    if (loadOnMount) {
      get() && debug && console.log('initializing...');
    }
  }, [debug, get, loadOnMount]);

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
    data: state.data,
    error: state.error,
    getCount: state.getCount,
    initialized,
    loading: state.loading,
    requests: state.requests,
    GET: get
  };
};

export default useData;
