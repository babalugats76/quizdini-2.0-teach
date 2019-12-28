import { useEffect, useState } from 'react';

const useTimeout = ({ millseconds = 0, debug = false }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer =
      active &&
      setTimeout(() => setActive(prevState => !prevState), millseconds);
    return () => {
      debug && console.log('clearing timer...');
      clearTimeout(timer);
    };
  }, [active, debug, millseconds]);

  useEffect(() => {
    debug && console.log(JSON.stringify(active));
  }, [active, debug]);

  return [active, setActive];
};

export default useTimeout;
