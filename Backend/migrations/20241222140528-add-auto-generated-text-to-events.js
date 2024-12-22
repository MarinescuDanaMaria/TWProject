'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {up: async (queryInterface, Sequelize) => {
  await queryInterface.addColumn("EVENTS", "autoGeneratedText", {
    type: Sequelize.STRING,
    allowNull: false,
  });
},

down: async (queryInterface) => {
  await queryInterface.removeColumn("EVENTS", "autoGeneratedText");
}
};
