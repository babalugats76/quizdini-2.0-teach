const mongoose = require('mongoose');
const shortid = require('shortid');
const { format } = require('date-fns');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');
const Match = mongoose.model('matches');
const Ping = mongoose.model('pings');
const { InsufficientCredits } = require('../errors.js');

module.exports = (app, memcache) => {
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
      //throw new Error('Test handling match update error...');
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
      const gameKey = `m-${match.matchId}`;
      const statKey = `m-s-${match.matchId}`;
      memcache.delete(gameKey);
      memcache.delete(statKey);
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
      const gameKey = `m-${match.matchId}`;
      const statKey = `m-s-${match.matchId}`;
      memcache.delete(gameKey);
      memcache.delete(statKey);
      res.send(match);
    } catch (e) {
      next(e);
    }
  });

  app.get('/api/matches', requireLogin, async (req, res, next) => {
    try {
      const matches = await Match.find({ user_id: req.user.id }, null, {
        sort: '-updateDate'
      });

      if (!matches) return res.send([]); // Return empty array to signify not found
      res.send(matches);
    } catch (e) {
      next(e);
    }
  });

  app.get('/api/match/stats/:id', requireLogin, async (req, res, next) => {
    try {
      let results;

      // Lookup game in cache; if found, return...
      const statKey = `m-s-${req.params.id}`;
      //  const cached = await memcache.get(statKey);
      //  if (cached && cached.userId === req.user.id) return res.send(cached);

      let match = await Match.findOne({
        user_id: req.user.id,
        matchId: req.params.id
      });
      if (!match) return res.send({}); // Return empty Object to signify not found
      const aggs = await Ping.aggregate([
        {
          $facet: {
            totals: [
              { $match: { gameId: req.params.id } },
              {
                $group: {
                  _id: null,
                  plays: { $sum: 1 },
                  avgScore: { $avg: '$results.score' }
                }
              },
              {
                $project: {
                  _id: false,
                  avgScore: 1,
                  plays: 1
                }
              }
            ],
            pings: [
              {
                $match: {
                  gameId: req.params.id,
                  createDate: {
                    $gte: new Date(
                      new Date().getTime() - 30 * 24 * 60 * 60 * 1000
                    )
                  }
                }
              },
              {
                $group: {
                  _id: {
                    $toDate: {
                      $subtract: [
                        { $toLong: '$createDate' },
                        {
                          $mod: [
                            { $toLong: '$createDate' },
                            1000 * 60 * 60 * 24
                          ]
                        }
                      ]
                    }
                  },
                  count: { $sum: 1 }
                }
              },
              { $sort: { _id: 1 } },
              {
                $project: {
                  _id: false,
                  plays: '$count',
                  day: { $dateToString: { format: '%m/%d/%Y', date: '$_id' } }
                }
              }
            ],
            terms: [
              { $match: { gameId: req.params.id } },
              {
                $group: { _id: { gameId: '$gameId', results: '$results.data' } }
              },
              { $unwind: { path: '$_id.results' } },
              {
                $group: {
                  _id: '$_id.results.term',
                  tries: {
                    $sum: { $add: ['$_id.results.hit', '$_id.results.miss'] }
                  },
                  hits: { $sum: '$_id.results.hit' },
                  misses: { $sum: '$_id.results.miss' }
                }
              },
              {
                $project: {
                  _id: 0,
                  term: '$_id',
                  tries: 1,
                  hits: 1,
                  misses: 1,
                  hitRate: {
                    $multiply: [{ $divide: ['$hits', '$tries'] }, 100]
                  },
                  missRate: {
                    $multiply: [{ $divide: ['$misses', '$tries'] }, 100]
                  }
                }
              },
              { $sort: { hitRate: 1, tries: -1 } }
            ]
          }
        }
      ]);

      const { createDate, matchId, options, title } = match.toJSON(); // convert to POJO and destructure
      const { 0: stats } = aggs;
      results = {
        matchId,
        title,
        userId: req.user.id,
        createDate: `${format(createDate, 'MM/dd/yyyy')}`,
        options,
        totals: { ...stats.totals[0] },
        pings: stats.pings,
        terms: stats.terms
      };
      memcache.set(statKey, results, { expires: 15 * 60 });
      res.send(results);
    } catch (e) {
      next(e);
    }
  });
};
