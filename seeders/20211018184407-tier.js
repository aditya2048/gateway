"use strict";

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
    await queryInterface.bulkInsert("Tiers", [
      {
        tierName: "Free",
        tierDescription: "Free Base tier",
        tier_max_requests_per_user: 100,
        tier_max_no_of_files: 100,
        tier_max_total_file_size: 52428800,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tierName: "Premium Tier 2",
        tierDescription: "$500 / month tier",
        tier_max_requests_per_user: 10000,
        tier_max_no_of_files: 10000,
        tier_max_total_file_size: 5368709120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tierName: "premium Tier 3",
        tierDescription: "$1,500 / month tier",
        tier_max_requests_per_user: 500000,
        tier_max_no_of_files: 500000,
        tier_max_total_file_size: 268435456000,
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
    await queryInterface.bulkDelete("Tiers", null, {});
  },
};
