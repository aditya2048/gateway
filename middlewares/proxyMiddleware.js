const {
  createProxyMiddleware,
  fixRequestBody,
} = require("http-proxy-middleware");
const { updateUserLimits } = require("../src/services/userStatsService");
// const streamify = require("stream-array");
const HttpProxy = require("http-proxy");
const { updateLogging } = require("../src/services/loggingService");
// const proxy = new HttpProxy();

async function updateLimitsToDatabaseMiddleware(req, res, next) {
  try {
    const deltaLimitsUpdated = await updateLogging(req.request_id, {
      file_size: req.deltaLimits.file_size,
      no_of_files: req.deltaLimits.no_of_files,
    });
    if (deltaLimitsUpdated[0] !== 1)
      throw new Error("DELTA LIMITS NOT UPDATED");
    const updated = await updateUserLimits(req.limits);
    if (updated[0] !== 1) throw new Error("LIMITS NOT UPDATED");
    return next();
  } catch (err) {
    console.log("ERROR", err);
    return res.status(500).json("Internal Error Occured Updating Limits");
  }
}

function proxtWebCreator(req, res, next) {
  return next();
}

async function handleProxyRes(responseBuffer, proxyRes, req, res) {
  try {
    const deltaLimitsUpdated = await updateLogging(req.req.request_id, {
      status_code: responseBuffer.statusCode,
    });
    if (deltaLimitsUpdated[0] !== 1)
      throw new Error("DELTA LIMITS NOT UPDATED");
    if (responseBuffer.statusCode != 200) {
      const resetLimits = { ...req.req.limits };
      console.log("CHNAGES", resetLimits, req.req.deltaLimits);
      resetLimits.request_remaining += 1;
      resetLimits.files_remaining += req.req.deltaLimits.no_of_files;
      resetLimits.files_size_remaining += req.req.deltaLimits.file_size;
      const updated = await updateUserLimits(resetLimits);
      if (updated[0] !== 1) throw new Error("LIMITS NOT UPDATED");
    }
  } catch (err) {
    console.log("ERROR", err);
  }
}

const setupProxies = (app, routes) => {
  routes.forEach((r) => {
    if (r.auth) {
      app.use(r.url, [
        updateLimitsToDatabaseMiddleware,
        createProxyMiddleware({
          ...r.proxy,
          onProxyRes: handleProxyRes,
        }),
      ]);
    } else {
      app.use(
        r.url,
        createProxyMiddleware({
          ...r.proxy,
          onProxyRes: handleProxyRes,
        })
      );
    }
  });
};

exports.setupProxies = setupProxies;
