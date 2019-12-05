import { useCallback } from 'react';

const useResult = ({
  successHeader = 'Success!',
  successSeverity = 'OK',
  failHeader = "Something's not quite right.",
  failSeverity = 'ERROR'
}) => {
  const getNotify = useCallback(
    results => {
      if (!results) return null;
      if (results.data)
        return {
          content: results.data.message,
          header: successHeader,
          severity: successSeverity
        };
      if (results.error)
        return {
          content: results.error.message,
          header: failHeader,
          severity: failSeverity
        };
    },
    [failHeader, failSeverity, successHeader, successSeverity]
  );

  return [getNotify];
};

export default useResult;
