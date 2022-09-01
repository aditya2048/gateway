const db = require("../../db");
const { User, Team, Tier } = db;
const bcrypt = require("bcrypt");
const { createNewJwtToken } = require("../../utils/jwtUtils");

async function createUser(user) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    if (user.teamId) {
      const team = await Team.findOne({
        where: { id: user.teamId },
        include: Tier,
      });
      const {
        tier_max_requests_per_user,
        tier_max_no_of_files,
        tier_max_total_file_size,
      } = team.Tier;
      user.user_request_remaining = tier_max_requests_per_user;
      user.no_of_patient_files = tier_max_no_of_files;
      user.user_total_file_size_remaining = tier_max_total_file_size;
    }
    user.roleId = 2;
    const newUser = await User.create({ ...user });
    return newUser;
  } catch (err) {
    console.log("User create Error", err);
  }
}

async function loginUser(user) {
  try {
    const { userName, password } = user;
    const fUser = await User.findOne({
      where: { userName },
    });
    if (!fUser) {
      return;
    }
    const compare = bcrypt.compareSync(password, fUser.password);
    if (!compare) {
      return;
    }
    const jwtToken = createNewJwtToken(fUser);
    return jwtToken;
  } catch (err) {
    console.log("USER LOGIN ERROR", err);
  }
}

async function updateUser({ id, user }) {
  let u = await User.findOne({ where: { id } });

  if (!u) return { status: 400, error: true, Message: "No such user" };

  const updated = await User.update({ ...user }, { where: { id } });

  if (updated[0] === 1) {
    const updatedUser = await User.findOne({ where: { id } });
    return {
      status: 200,
      Message: "User updated successfully",
      user: updatedUser,
    };
  } else return { status: 500, error: true, Message: "User not updated" };
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
};
