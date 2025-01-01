'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("EVENTS", "status", {
      type: Sequelize.ENUM("OPEN", "CLOSED", "SCHEDULED"),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("EVENTS", "status", {
      type: Sequelize.ENUM("OPEN", "CLOSED"),
      allowNull: false,
    });
  },
};
