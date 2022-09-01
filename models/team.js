"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Teams.init(
    {
      teamName: DataTypes.STRING,
      teamDescription: DataTypes.STRING,
      subscribedTier: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Team",
    }
  );

  Teams.associate = function (models) {
    Teams.hasMany(models.User, {
      foreignKey: "teamId",
    });
    Teams.belongsTo(models.Tier, {
      foreignKey: "subscribedTier",
    });
  };

  return Teams;
};
