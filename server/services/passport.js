const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const md5 = require('md5');
const keys = require('../config/keys');

const User = mongoose.model('users');

/**
 * Function executed after strategy callback (user find)
 */
passport.serializeUser((user, done) => {
  // No error & serialize `id` key added to mongoDB collection via mongoose model
  try {
    done(null, user.id);
  } catch (e) {
    done(e);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    await User.findById(id).then(user => {
      done(null, user);
    });
  } catch (e) {
    done(e);
  }
});

/**
 * Configure OAuth Passport strategy
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const {
          email,
          email_verified,
          family_name,
          given_name,
          picture, 
          sub
        } = profile._json;

        const existingUser = await User.findOne({
          $and: [{ googleId: sub }, { googleId: { $exists: true } }]
        });

        if (existingUser) {
          return done(null, existingUser); // call Passport callback, providing error and User
        }

        const user = await new User({
          googleId: sub,
          googlePicture: picture,
          title: null,
          firstName: given_name,
          lastName: family_name,
          city: null,
          stateCode: null,
          countryCode: null,
          email: email,
          verified: email_verified,
          createDate: Date.now(),
          lastLoginDate: Date.now()
        }).save();
        done(null, user);
      } catch (e) {
        done(e);
      }
    }
  )
);

/*
  Configure Local Passport Strategy 
*/
passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      try {
        const user = await User.findOne({
          $and: [
            { username: username.toLowerCase() },
            { password: md5(password) },
            { username: { $exists: true } },
            { password: { $exists: true } },
            { googleId: { $exists: false } },
            { verified: true }
          ]
        });

        if (!user) return done(null, null);

        /**
         * req.logIn must be used when utilizing
         * passport.authenticate with a custom callback
         */
        await req.logIn(user, function(err) {
          if (err) {
            return done(err);
          }
          done(null, user);
        });
      } catch (e) {
        done(e);
      }
    }
  )
);
