import { useCallback } from 'react';
import { useActions } from './';
import * as actions from '../actions/';

/***
 * Custom Hook for using the `fetchAuth` redux action
 */
export default function useAuth() {
  const dispatchAuth = useActions(actions.fetchAuth); // bound, dispatchable action to update `auth` in redux

  /**
   * Memoized function which wraps call of `fetchAuth`
   * which asynchronously updates `auth` in the redux store.
   */
  return useCallback(() => {
    async function fetchAuth() {
      await dispatchAuth();
    }
    fetchAuth();
  }, [dispatchAuth]);
}
