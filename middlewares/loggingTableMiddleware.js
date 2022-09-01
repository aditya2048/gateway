const { createLogging } = require("../src/services/loggingService");

async function createLoggingTable(logs) {
  try {
    const logging = await createLogging(logs);
    return logging.dataValues;
  } catch (err) {
    console.log("ERROR", err);
  }
}

function setupLoggingTableMiddleware(app, routes) {
  routes.forEach((r) => {
    app.use(r.url, async function (req, res, next) {
      if (r.auth) {
        let logs = await createLoggingTable({
          url: r.url,
          proxy: r.proxy.target,
          user_id: req.user.id,
          file_size: 0,
          no_of_files: 0,
        });
        req.request_id = logs.id;
        req.deltaLimits = logs;
      } else {
        let logs = await createLoggingTable({
          url: r.url,
          proxy: r.proxy.target,
          file_size: 0,
          no_of_files: 0,
        });
        req.request_id = logs.id;
        req.deltaLimits = logs;
      }
      next();
    });
  });
}

module.exports = setupLoggingTableMiddleware;
