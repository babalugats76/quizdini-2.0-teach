// keys.js - environment-centric credentials

if(process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  // return dev keys
  module.exports = require('./dev');
}