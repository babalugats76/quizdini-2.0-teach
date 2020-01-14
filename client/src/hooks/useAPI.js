import { useCallback } from "react";
import axios from "axios";

/**
 * Include a custom, "common" header named 'quizdini-timezone'
 * containing the client's current timezone
 */
axios.defaults.headers.common[
  "quizdini-timezone"
] = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Custom Hook for direct API interactions using the axios library.
 *
 * Basically, a set of memoized functions that facilitates interactions
 * with a backend URL.
 *
 * @param {object}        Params, including: `url` (path to resource)
 * @returns {object}      Aliased, method-centric CRUD functions, e.g., `GET`, `PUT`, etc.
 */

export default function useAPI({ url }) {
  /***
   * Calls GET method of url using axios
   * @returns {object}  data or error object (from server)
   */
  const get = useCallback(async () => {
    try {
      const res = await axios.get(url);
      return { data: res.data };
    } catch (err) {
      return {
        error: err.response.data
      };
    }
  }, [url]);

  /***
   * Calls PUT method of url using axios
   * @param {object} data  Update values (to pass to server)
   * @param {string} id    (Optional) id (of item) to append to resource url
   * @returns {object}     data or error object (from server)
   */
  const put = useCallback(
    async (data, id = null) => {
      try {
        const path = url + (id ? `/${id}` : "");
        const res = await axios.put(path, data);
        return { data: res.data };
      } catch (err) {
        return {
          error: err.response.data
        };
      }
    },
    [url]
  );

  /***
   * Calls POST method of url using axios
   * @param {object} data  Create values (to pass to server)
   * @param {string} id    (Optional) id (of item) to append to resource url
   * @returns {object}     data or error object (from server)
   */
  const post = useCallback(
    async (data, id = null) => {
      try {
        const path = url + (id ? `/${id}` : "");
        const res = await axios.post(path, data);
        return { data: res.data };
      } catch (err) {
        return {
          error: err.response.data
        };
      }
    },
    [url]
  );

  /***
   * Calls DELETE method of url using axios
   * @param {string} id    id (of item) to append to resource url
   * @returns {object}     data or error object (from server)
   */
  const remove = useCallback(
    async id => {
      try {
        const path = url + "/" + id;
        const res = await axios.delete(path);
        return { data: res.data };
      } catch (err) {
        return {
          error: err.response.data
        };
      }
    },
    [url]
  );

  return { GET: get, PUT: put, POST: post, DELETE: remove };
}
