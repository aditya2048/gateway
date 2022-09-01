const db = require("../../db");
const { User, Team, Tier, User_Request_stats, Logging } = db;

async function checkUserLimits({ path, user_id }) {
  try {
    const user_request_stat = await User_Request_stats.findOne({
      where: { path, user_id },
    });
    return user_request_stat;
  } catch (err) {
    console.log("ERROR - ", err);
    return [];
  }
}

async function createUserLimits({
  path,
  user_id,
  request_remaining,
  files_remaining,
  files_size_remaining,
}) {
  try {
    const user_limits = await User_Request_stats.create({
      path,
      user_id,
      request_remaining,
      files_remaining,
      files_size_remaining,
    });
    return user_limits;
  } catch (err) {
    console.log("ERROR", err);
    return;
  }
}

async function updateUserLimits(newLimits) {
  const {
    user_id,
    path,
    request_remaining,
    files_remaining,
    files_size_remaining,
  } = newLimits;
  try {
    const updated = await User_Request_stats.update(
      { request_remaining, files_remaining, files_size_remaining },
      { where: { user_id, path } }
    );
    return updated;
  } catch (err) {
    console.log("ERROR", err);
    return [0];
  }
}

module.exports = {
  checkUserLimits,
  createUserLimits,
  updateUserLimits,
};
