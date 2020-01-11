import { useCallback, useEffect } from "react";

const useTitle = ({ title, deps = [] }) => {
  const setTitle = useCallback(() => {
    document.title = [process.env.REACT_APP_WEBSITE_NAME, title].join(" | ");
  }, [title]);

  useEffect(
    () => {
      title && setTitle(title);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps, title] : []
  );
};

export default useTitle;
