"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Filters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Filters.init(
    {
      filter_type: DataTypes.STRING,
      filter_description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Filter",
    }
  );
  return Filters;
};
