const memjs = require("memjs"); // memcache client (from memcachier)

module.exports = keys => {
  // Create instance of memjs client
  const mc = memjs.Client.create(keys.memcachierServers, {
    expires: keys.memcacheExpire, // default: 0 (never expires)
    failover: true, // default: false
    keepAlive: true, // default: false
    password: keys.memcachierPassword,
    timeout: 1, // default: 0.5 (seconds)
    username: keys.memcachierUsername
  });

  /***
   * MemCache wrapper class.
   *
   * Follows singleton design pattern that wraps `memjs` client functionality.
   *
   */
  const MemCache = {
    /**
     * Get cached value in JSON format.
     *
     * Return value of `null` is used to signify not found or error
     * because in either case, there was a cache miss.
     *
     * @param {string} key  Key to obtain from cache
     * @return {Object}     Value, in JSON format, from cache lookup; `null` if not found
     */
    get: key =>
      mc.get(key).then(
        data => (data.value ? JSON.parse(data.value.toString()) : null),
        err => null
      ),
    /**
     * Set/overwrite cached value (from JSON format).
     *
     * Converts provided JSON values to strings because
     * many memcache implementations, e.g., Memcachier,
     * only support buffers and strings--not objects.
     *
     * @param {string} key    Key to associate with value when writing to the cache
     * @param {Object} value  Value, in JSON format, to write to the cache
     */
    set: (key, value, options = {}) =>
      mc.set(key, JSON.stringify(value), options).then(
        data =>
          console.log(
            "Cached:",
            key,
            " => ",
            value,
            "with",
            Object.keys(options).length === 0 ? "default" : options,
            "options"
          ),
        err => console.log("Unable to cache:", key, " => ", value)
      ),
    /**
     * Removes cached value from the cache.
     *
     * Return value of `true` simply means that the operation
     * was successfully attempted, i.e., does not mean key was present.
     *
     * @param {string} key     Key to delete from the cache
     * @return {boolean}       Whether operation was successful (no errors)
     */
    delete: key =>
      mc.delete(key).then(
        success => {
          console.log("Removed from cache:", key);
          return true; // if attempt was succeeded
        },
        err => {
          console.log("Unable to delete from cache:", key);
          return false; // if there was an exception
        }
      )
  };

  // export singleton
  return Object.freeze(MemCache);
};
