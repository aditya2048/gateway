const express = require("express");
const { createTeam } = require("../services/teamService");
const router = express.Router();

router.post("/create", async function (req, res) {
  try {
    const { teamName, teamDescription, subscribedTier } = req.body;
    const team = await createTeam({
      teamName,
      teamDescription,
      subscribedTier,
    });
    res.status(team.status).json(team);
  } catch (err) {
    console.log("ERROR - ", err);
    res.status(500).json({ Error: err });
  }
});

module.exports = router;
