"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tiers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tiers.init(
    {
      tierName: DataTypes.STRING,
      tierDescription: DataTypes.STRING,
      tier_max_requests_per_user: DataTypes.BIGINT,
      tier_max_no_of_files: DataTypes.BIGINT,
      tier_max_total_file_size: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "Tier",
    }
  );

  Tiers.associate = function (models) {
    Tiers.hasMany(models.Team, {
      foreignKey: "subscribedTier",
    });
  };

  return Tiers;
};
