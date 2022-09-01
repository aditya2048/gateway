const { validateJwt } = require("../utils/jwtUtils");
const { getLimitsFromReqObj } = require("../utils/limitUtils");

function checkJwtValidMiddleware(req, res, next) {
  const auth_token = req.header("authorization");
  if (!auth_token) {
    return res.status(422).send({ Error: "No Auth Token Provided" });
  }
  const token = auth_token.slice(7, auth_token.lenght);
  const bearer = auth_token.slice(0, 6);

  if (!token || bearer !== "Bearer") {
    return res.status(422).send({ Error: "Invalid Token" });
  }
  try {
    const decoded = validateJwt(token);

    if (!decoded) {
      return res.status(422).send({ Error: "Unauthorized Access" });
    }
    req.user = decoded;

    return next();
  } catch (e) {
    return res.status(422).send({ Error: e });
  }
}

function setupAuth(app, routes) {
  routes.forEach((r) => {
    if (r.auth) {
      app.use(r.url, checkJwtValidMiddleware, async function (req, res, next) {
        try {
          let limit = await getLimitsFromReqObj(req.user, r.url);
          if (limit) {
            req.limits = limit.dataValues;
            next();
          } else throw new Error("No limits generated");
        } catch (err) {
          console.log("ERROR OCCURED IN LIMITS", err);
          res.status(500).json("Internal Error Occured In SetUpAuth");
        }
      });
    }
  });
}

module.exports = setupAuth;
