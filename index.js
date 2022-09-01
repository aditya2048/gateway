const express = require("express");
const { setupLogging } = require("./logging");
const setupAuth = require("./middlewares/authMiddleware");
const setupLoggingTableMiddleware = require("./middlewares/loggingTableMiddleware");
const { setupProxies } = require("./middlewares/proxyMiddleware");
const setupRatelimit = require("./middlewares/rateLimitUserMiddleware");
const setupFileSizelimit = require("./middlewares/sizeFileFilterMIddleware");
const { ROUTES } = require("./routes");
const { userController, teamController } = require("./src/contoller");
const { multerUpload } = require("./utils/multerUtils");

const app = express();
const port = 4000;

setupLogging(app);
setupAuth(app, ROUTES);
setupLoggingTableMiddleware(app, ROUTES);
setupRatelimit(app, ROUTES);
setupFileSizelimit(app, ROUTES);
setupProxies(app, ROUTES);

app.use(express.json());

app.get("/hello", (req, res) => {
  return res.send("HELLO WORLD!");
});

app.use("/users", userController);

app.use("/teams", teamController);

app.post("/uploadFiles", multerUpload, (req, res) => {
  res.json({ files: req.files, body: req.body });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
