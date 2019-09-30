const passport = require('passport');
const { LoginFailed } = require('../errors.js');

module.exports = app => {
  /**
   * /auth/local POST utilizes a custom callback for passport.authenticate
   * in order to have full control over return, function signature, etc.
   */
  app.post('/auth/local', async (req, res, next) => {
    passport.authenticate('local', function(err, user) {
      try {
        if (err) return next(err);
        if (!user)
          throw new LoginFailed(
            'Unable to Login - Invalid credentials or unverified account.'
          );
        const message = `Welcome back, ${user.fullName}`;
        res.send(message);
      } catch (e) {
        next(e);
      }
    })(req, res, next);
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
