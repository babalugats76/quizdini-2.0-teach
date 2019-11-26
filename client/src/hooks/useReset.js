import { useEffect, useState } from 'react';
import useActions from './useActions';

export default function(action) {
  
  const [isReset, setIsReset] = useState(null);
  const resetAction = useActions(action);

  useEffect(() => {
    async function reset() {
      await resetAction();
      setIsReset(true);
    }
    reset();
  }, [resetAction]);

  return [isReset];
}
