"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        userName: "admin",
        firstName: "Admin",
        lastName: "Admin",
        password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
        // user_request_remaining: ,
        // no_of_patient_files: DataTypes.INTEGER,
        // user_total_file_size_remaining: DataTypes.STRING,
        // teamId: DataTypes.INTEGER,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: "test",
        firstName: "test",
        lastName: "test",
        password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
        user_request_remaining: 100,
        no_of_patient_files: 100,
        user_total_file_size_remaining: 51200,
        teamId: 1,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
