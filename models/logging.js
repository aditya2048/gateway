"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Logging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Logging.init(
    {
      url: DataTypes.STRING,
      proxy: DataTypes.STRING,
      file_size: DataTypes.BIGINT,
      no_of_files: DataTypes.BIGINT,
      status_code: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Logging",
    }
  );
  return Logging;
};
