const {
  checkUserLimits,
  createUserLimits,
} = require("../src/services/userStatsService");

async function getLimitsFromReqObj(user, path) {
  try {
    let limit = await checkUserLimits({
      path,
      user_id: user.id,
    });
    if (!limit) {
      const {
        id,
        user_request_remaining,
        no_of_patient_files,
        user_total_file_size_remaining,
      } = user;
      const newLimits = await createUserLimits({
        user_id: id,
        path,
        request_remaining: user_request_remaining,
        files_size_remaining: user_total_file_size_remaining,
        files_remaining: no_of_patient_files,
      });
      return newLimits;
    } else return limit;
  } catch (err) {
    console.log("ERROR IN CALCULATING LIMITS", err);
    return;
  }
}

async function updateLimits() {}

module.exports = { getLimitsFromReqObj };
