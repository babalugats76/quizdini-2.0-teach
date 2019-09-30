/**
 * According to the cra documentation:
 * "You do not need to import this file anywhere. It is automatically registered when you start the development server."
 */

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy(['/api/', '/auth/'], {
      target: 'http://localhost:5000'
    })
  );
};
