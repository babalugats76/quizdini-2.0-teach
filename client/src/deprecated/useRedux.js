import { useCallback } from 'react';

export default function useRedux(boundActionCreator) {
  const callAction = useCallback((args) => {
    return boundActionCreator(args);
  }, [boundActionCreator]);

  return [callAction];
}
