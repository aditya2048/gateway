const express = require("express");
const { validateJwt } = require("../../utils/jwtUtils");
const {
  createUser,
  loginUser,
  updateUser,
} = require("../services/userService");
const router = express.Router();

router.post("/signup", async function (req, res) {
  const {
    firstName,
    lastName,
    password,
    roleId = 2,
    teamId = 2,
    userName,
    companyName,
    companyCode,
  } = req.body;
  try {
    const user = await createUser({
      firstName,
      lastName,
      password,
      roleId,
      teamId,
      userName,
      companyCode,
      companyName,
    });
    res.status(200).json({ User: user });
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async function (req, res) {
  try {
    const { userName, password } = req.body;
    const token = await loginUser({ userName, password });
    if (token) res.status(200).json({ token });
    else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json("Invalid Credentials");
    console.log(err);
  }
});

router.patch("/", async function (req, res) {
  try {
    const auth_token = req.header("authorization");
    const token = auth_token.slice(7, auth_token.lenght);
    const decoded = validateJwt(token);
    const { companyName, firstName, lastName, userName, teamId } = req.body;
    const { id } = decoded;

    const update = await updateUser({
      id,
      user: { companyName, firstName, lastName, userName, teamId },
    });

    res.status(update.status).json(update);
  } catch (err) {
    console.log("CATCH ERROR - ", err);
    res.status(500).json({ Message: "Internal server Error" });
  }
});

module.exports = router;
