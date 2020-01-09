import { useEffect, useMemo, useState } from "react";

const useWindowSize = (tabletBreakpoint = 768) => {
  const isClient = typeof window === "object";
  
  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  const isMobile = useMemo(() => {
    return windowSize.width < tabletBreakpoint ? true : false;
  }, [tabletBreakpoint, windowSize.width]);

  useEffect(
    () => {
      if (!isClient) return false;

      function handleResize() {
        setWindowSize(getSize());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return [isMobile];
};

export default useWindowSize;
