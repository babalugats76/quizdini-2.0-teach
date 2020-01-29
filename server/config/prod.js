// prod.js - production keys
module.exports = {
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsRegion: process.env.AWS_REGION,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  cookieKey: process.env.COOKIE_KEY,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  memcacheExpire: process.env.MEMCACHE_EXPIRE,
  memcachierPassword: process.env.MEMCACHIER_PASSWORD,
  memcachierServers: process.env.MEMCACHIER_SERVERS,
  memcachierUsername: process.env.MEMCACHIER_USERNAME,
  mongoURI: process.env.MONGO_URI,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  googleClientID: process.env.GOOGLE_CLIENT_ID
};
