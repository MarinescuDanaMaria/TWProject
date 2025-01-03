"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert( 
      "roles",
      [ 
        {
          id: Sequelize.literal("UUID()"),
          name: "USER",
          createdAt: new Date(), 
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal("UUID()"),
          name: "ORGANIZATOR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
