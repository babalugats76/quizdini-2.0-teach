const mongoose = require('mongoose');
const shortid = require('shortid');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');
const Match = mongoose.model('matches');
const { InsufficientCredits } = require('../errors.js');

module.exports = app => {
  app.post('/api/match/', requireLogin, async (req, res, next) => {
    try {
      const { title, instructions, matches, options, published } = req.body;

      const user = await User.findOne({ _id: req.user.id });
      const { credits = 0 } = user;

      if (credits <= 0) throw new InsufficientCredits();

      const match = await new Match({
        createDate: Date.now(),
        instructions,
        matchId: shortid.generate(),
        matches,
        options,
        published,
        title,
        user_id: req.user._id
      }).save();

      user.credits -= 1; 
      await user.save();

      res.send(match);
    } catch (e) {
      next(e);
    }
  });

  app.get('/api/match/:id', requireLogin, async (req, res, next) => {
    try {
      const match = await Match.findOne({
        user_id: req.user.id,
        matchId: req.params.id
      });
      if (!match) return res.send({}); // Return empty Object to signify not found
      res.send(match);
    } catch (e) {
      next(e);
    }
  });

  app.put('/api/match/:id', requireLogin, async (req, res, next) => {
    try {
      const { title, instructions, matches, options, published } = req.body;
      const match = await Match.findOneAndUpdate(
        {
          user_id: req.user.id,
          matchId: req.params.id
        },
        {
          title,
          instructions,
          matches,
          options,
          published,
          updateDate: Date.now()
        },
        { new: true, useFindAndModify: false }
      );

      if (!match) return res.send({}); // Return empty Object to signify not found
      res.send(match);
    } catch (e) {
      next(e);
    }
  });

  app.delete('/api/match/:id', requireLogin, async (req, res, next) => {
    try {
      const match = await Match.findOneAndDelete({
        user_id: req.user.id,
        matchId: req.params.id
      });

      if (!match) return res.send({}); // Return empty Object to signify not found
      res.send(match);
    } catch (e) {
      next(e);
    }
  });

  app.get('/api/matches', requireLogin, async (req, res, next) => {
    try {
      //throw new Error('Testing matches api error...');
      const matches = await Match.find({ user_id: req.user.id }, null, {
        sort: '-updateDate'
      });

      if (!matches) return res.send([]); // Return empty array to signify not found
      res.send(matches);
    } catch (e) {
      next(e);
    }
  });
};
