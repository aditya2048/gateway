"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Request_stats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Request_stats.init(
    {
      user_id: DataTypes.INTEGER,
      path: DataTypes.STRING,
      request_remaining: DataTypes.BIGINT,
      files_remaining: DataTypes.BIGINT,
      files_size_remaining: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "User_Request_stats",
    }
  );

  User_Request_stats.associate = function (models) {
    User_Request_stats.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  };

  return User_Request_stats;
};
