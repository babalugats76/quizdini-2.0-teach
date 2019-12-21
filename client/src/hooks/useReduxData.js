import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import * as actions from '../actions';
import { useActions } from '/';

const useReduxData = ({ items = [], deps = [], debug = false }) => {
  const isCancelled = useRef(false);
  const boundActions = useActions(actions);
  const initialState = {
    executions: 0,
    hasError: false,
    loading: false,
    requests: 0,
    results: null
  };
  const [state, setState] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCH_BEGIN':
        return {
          ...state,
          hasError: false,
          loading: true,
          results: null
        };
      case 'FETCH_END':
        return {
          ...state,
          executions: state.executions + 1,
          hasError: action.errorCount ? true : false,
          loading: false,
          requests: state.requests + action.count,
          results: action.results
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          executions: state.executions + 1,
          hasError: true,
          loading: false,
          results: action.results
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

  const errors = useMemo(() => {
    if (state.hasError) {
      return (
        (Array.isArray(state.results) &&
          state.results.map((accum, result) => {
            if (result.error) accum.push(result.error);
            return accum;
          }, [])) || [state.results]
      );
    }
  }, [state.hasError, state.results]);

  const fetchData = useCallback(() => {
    if (!items.length) return;
    dispatch({ type: 'FETCH_BEGIN' });
    Promise.all(
      items.map(async action => {
        const res = await boundActions[action]();
        if (res.data) return { action, data: res.data };
        if (res.error) return { action, error: res.error };
      })
    )
      .then(res => {
        const errorCount = res.reduce((accum, action) => {
          if (action.error) return accum + 1;
          return accum;
        }, 0);
        dispatch({
          type: 'FETCH_END',
          count: res.length,
          errorCount,
          results: res
        });
      })
      .catch(err => {
        dispatch({
          type: 'FETCH_FAILURE',
          count: err.length,
          results: 'Error fetching data...'
        });
      });
  }, [items, boundActions, dispatch]);

  useEffect(
    () => {
      fetchData();
      return () => {
        debug && console.log('useFetchData cleanup...');
        isCancelled.current = true;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? deps : []
  );

  useEffect(() => {
    debug && console.log(JSON.stringify(state));
  }, [debug, state]);

  return {
    ...state,
    errors
  };
};

export default useReduxData;
