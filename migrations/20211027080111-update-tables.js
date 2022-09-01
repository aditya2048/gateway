"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.changeColumn("Users", "user_request_remaining", {
        type: Sequelize.BIGINT,
        allowNull: true,
      }),
      queryInterface.changeColumn("Users", "no_of_patient_files", {
        type: Sequelize.BIGINT,
        allowNull: true,
      }),
      queryInterface.changeColumn("Users", "user_total_file_size_remaining", {
        type: Sequelize.BIGINT,
        allowNull: true,
      }),
      queryInterface.changeColumn("User_Request_stats", "request_remaining", {
        type: Sequelize.BIGINT,
        allowNull: true,
      }),
      queryInterface.changeColumn("User_Request_stats", "files_remaining", {
        type: Sequelize.BIGINT,
        allowNull: true,
      }),
      queryInterface.changeColumn(
        "User_Request_stats",
        "files_size_remaining",
        {
          type: Sequelize.BIGINT,
          allowNull: true,
        }
      ),
      queryInterface.changeColumn("Tiers", "tier_max_requests_per_user", {
        type: Sequelize.BIGINT,
        allowNull: true,
      }),
      queryInterface.changeColumn("Tiers", "tier_max_no_of_files", {
        type: Sequelize.BIGINT,
        allowNull: true,
      }),
      queryInterface.changeColumn("Tiers", "tier_max_total_file_size", {
        type: Sequelize.BIGINT,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.changeColumn("Users", "user_request_remaining", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn("Users", "no_of_patient_files", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn("Users", "user_total_file_size_remaining", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn("User_Request_stats", "request_remaining", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn("User_Request_stats", "files_remaining", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn(
        "User_Request_stats",
        "files_size_remaining",
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
      ),
      queryInterface.changeColumn("Tiers", "tier_max_requests_per_user", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn("Tiers", "tier_max_no_of_files", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn("Tiers", "tier_max_total_file_size", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },
};
