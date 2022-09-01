// const db = require("../../db");
const {
  checkUserLimits,
  updateUserLimits,
} = require("../src/services/userStatsService");

async function rateLimitUser(req, res, next) {
  const newLimits = { ...req.limits };
  newLimits.request_remaining -= 1;
  if (newLimits.request_remaining < 0)
    return res.status(429).json("Too many requests");
  else {
    req.limits = newLimits;
    return next();
  }
}

function setupRatelimit(app, routes) {
  routes.forEach((r) => {
    if (r.rateLimited) {
      app.use(r.url, rateLimitUser, function (req, res, next) {
        next();
      });
    }
  });
}

module.exports = setupRatelimit;
