import { useCallback } from "react";

/**
 * Custom Hook to convert results into notifications.
 *
 * Faciliates the ability to perform simultaneous redux fetches.
 *
 * @param {object}       Params, including: `failHeader`, `failSeverity`, `successHeader`, and `successSeverity`
 * @returns {function}   Function that returns notification object.
 */
export default function useResult({
  failHeader = "Something's not quite right.",
  failSeverity = "ERROR",
  successHeader = "Success!",
  successSeverity = "OK"
} = {}) {
  /***
   * Memoized function that converts results
   * to properly-formatted notification objects.
   *
   * @param {object} results  Results objects (normally obtained from api call)
   * @returns {object}        Notification object (normally presented to user as dismissable message)
   */
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

  return getNotify; // function that converts results to a notification
}
