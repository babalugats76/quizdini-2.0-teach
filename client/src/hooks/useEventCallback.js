import { useCallback, useEffect, useRef } from "react";

export default function useEventCallback(fn, deps) {
  const ref = useRef();

  useEffect(
    () => {
      ref.current = fn;
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [fn, ...deps]
  );

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}
