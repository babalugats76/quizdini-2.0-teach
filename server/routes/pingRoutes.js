const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Ping = mongoose.model("pings");

module.exports = (app, memcache) => {
  app.get("/api/pings/:id", requireLogin, async (req, res, next) => {
    try {
      const pings = await Ping.aggregate([
        { $match: { gameId: req.params.id } },
        {
          $group: {
            _id: {
              $toDate: {
                $subtract: [
                  { $toLong: "$createDate" },
                  { $mod: [{ $toLong: "$createDate" }, 1000 * 60 * 60 * 24] }
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
            plays: "$count",
            day: { $dateToString: { format: "%m/%d/%Y", date: "$_id" } }
          }
        }
      ]);

      if (!pings || (pings && pings.length === 0)) return res.send({}); // Empty object signifies not found

      let results = { labels: [], data: [] };

      pings.map(ping => {
        results.labels.push(ping.day);
        results.data.push(ping.plays);
      });

      res.send(results);
    } catch (e) {
      next(e);
    }
  });

  app.get("/api/breakdown/:id", requireLogin, async (req, res, next) => {
    try {
      const breakdown = await Ping.aggregate([
        {
          $facet: {
            alltime: [
              { $match: { gameId: req.params.id } },
              {
                $group: {
                  _id: null,
                  totalPlays: { $sum: 1 },
                  averageScore: { $avg: "$results.score" }
                }
              },
              {
                $project: {
                  _id: false,
                  averageScore: 1,
                  totalPlays: 1
                }
              }
            ],
            playsByDay: [
              { $match: { gameId: req.params.id } },
              {
                $group: {
                  _id: {
                    $toDate: {
                      $subtract: [
                        { $toLong: "$createDate" },
                        { $mod: [{ $toLong: "$createDate" }, 1000 * 60 * 60 * 24] }
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
                  plays: "$count",
                  day: { $dateToString: { format: "%m/%d/%Y", date: "$_id" } }
                }
              }
            ],
            terms: [
              { $match: { gameId: req.params.id } },
              { $group: { _id: { gameId: "$gameId", results: "$results.data" } } },
              { $unwind: { path: "$_id.results" } },
              {
                $group: {
                  _id: "$_id.results.term",
                  attempts: { $sum: { $add: ["$_id.results.hit", "$_id.results.miss"] } },
                  hits: { $sum: "$_id.results.hit" },
                  misses: { $sum: "$_id.results.miss" }
                }
              },
              {
                $project: {
                  _id: 0,
                  term: "$_id",
                  attempts: 1,
                  hits: 1,
                  misses: 1,
                  hitRate: { $multiply: [{ $divide: ["$hits", "$attempts"] }, 100] },
                  missRate: { $multiply: [{ $divide: ["$misses", "$attempts"] }, 100] }
                }
              },
              { $sort: { hitRate: 1, attempts: -1 } }
            ]
          }
        }
      ]);
      res.send(breakdown);
    } catch (e) {
      next(e);
    }
  });
};
