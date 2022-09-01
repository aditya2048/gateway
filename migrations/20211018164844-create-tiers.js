"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tiers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tierName: {
        type: Sequelize.STRING,
      },
      tierDescription: {
        type: Sequelize.STRING,
      },
      tier_max_requests_per_user: {
        type: Sequelize.BIGINT,
      },
      tier_max_no_of_files: {
        type: Sequelize.BIGINT,
      },
      tier_max_total_file_size: {
        type: Sequelize.BIGINT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tiers");
  },
};
