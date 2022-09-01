const db = require("../../db");
const { Team, Tier } = db;

async function createTeam(team) {
  try {
    const tier = await Tier.findOne({ where: { id: team.subscribedTier } });
    const teamExists = await Team.findOne({
      where: { teamName: team.teamName },
    });

    if (teamExists)
      return { error: true, Message: "Team already exists", status: 403 };

    if (!tier)
      return { error: true, Message: "No such Tier exists", status: 400 };

    const newTeam = await Team.create(team);
    return { team: newTeam, Message: "Created Successfully", status: 200 };
  } catch (err) {
    console.log("ERROR - ", err);
    return { error: true, Message: err, status: 500 };
  }
}

module.exports = { createTeam };
