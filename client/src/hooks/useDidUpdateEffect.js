import { useEffect, useRef } from 'react';
export default function useDidUpdateEffect(fn, deps) {
  const didMount = useRef(false);


  useEffect(() => {
    if (didMount.current) fn();
    didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps ? [fn, ...deps] : [fn]);
}
