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
};
