const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "secretString";

function createNewJwtToken(user) {
  const access_token = jwt.sign(
    {
      id: user.id,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      user_request_remaining: user.user_request_remaining,
      no_of_patient_files: user.no_of_patient_files,
      user_total_file_size_remaining: user.user_total_file_size_remaining,
      teamId: user.teamId,
      roleId: user.roleId,
    },
    secret
  );
  return access_token;
}

function validateJwt(token) {
  const decoded = jwt.verify(token, secret);
  return decoded;
}

module.exports = { createNewJwtToken, validateJwt };
