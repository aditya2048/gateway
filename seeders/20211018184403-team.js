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
    await queryInterface.bulkInsert("Teams", [
      {
        teamName: "Tier 2 Team",
        teamDescription: "has subscribed tier 2 premium plan",
        subscribedTier: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamName: "Free Plan Team",
        teamDescription: "Default team when free plan is subscribed",
        subscribedTier: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teamName: "Tier 3 Team",
        teamDescription: "has subscribed tier 2 premium plan",
        subscribedTier: 3,
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
