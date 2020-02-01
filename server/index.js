require("newrelic");
const sslRedirect = require("heroku-ssl-redirect");
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

//const cors = require('cors');
const keys = require("./config/keys");
const errorHandler = require("./middlewares/errorHandler");

require("./models/Country"); // Used in various lookup routes
require("./models/State"); // Used in various lookup routes
require("./models/User"); // Load before passport, etc.,
require("./models/Match"); // Used in match routes, etc.
require("./models/Token"); // Used in user routes
require("./models/Payment"); // Used in payment route
require("./models/Ping"); // Used in ping/stat routes
require("./services/passport"); // Since nothing is being exported

const memcache = require("./services/memcache")(keys);

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const app = express();

// enable ssl redirect
app.use(sslRedirect());

//app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/matchRoutes")(app, memcache);
require("./routes/paymentRoutes")(app);
require("./routes/pingRoutes")(app, memcache);
require("./routes/test")(app);
require("./routes/userRoutes")(app);

app.use(errorHandler); // Custom default, i.e., catch-all, error handler middleware

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
