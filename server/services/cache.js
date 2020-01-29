const memjs = require("memjs");

memjs.Client.prototype.remove = function(key) {
  return this.delete(key).then(
    success => true,
    err => false
  );
};

memjs.Client.prototype.getJson = function(key) {
  return this.get(key).then(
    data => (data.value ? JSON.parse(data.value.toString()) : null),
    err => null
  );
};

memjs.Client.prototype.setJson = function(key, value, ...rest) {
  return this.set(key, JSON.stringify(value), ...rest).then(
    data => console.log("Cached:", key, " => ", value, "with", ...rest, "options"),
    err => console.log("Unable to add to cache:", key, " => ", value)
  );
};

module.exports = keys => {
  return memjs.Client.create(keys.memcachierServers, {
    failover: true, // default: false
    keepAlive: true, // default: false
    password: keys.memcachierPassword,
    timeout: 1, // default: 0.5 (seconds)
    username: keys.memcachierUsername
  });
};
