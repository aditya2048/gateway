"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      user_request_remaining: DataTypes.BIGINT,
      no_of_patient_files: DataTypes.BIGINT,
      user_total_file_size_remaining: DataTypes.BIGINT,
      teamId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
      companyName: DataTypes.STRING,
      companyCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.associate = function (models) {
    User.belongsTo(models.Team, {
      foreignKey: "teamId",
    });
    User.belongsTo(models.Role, {
      foreignKey: "roleId",
    });
    User.hasMany(models.User_Request_stats, {
      foreignKey: "user_id",
    });
  };

  return User;
};
