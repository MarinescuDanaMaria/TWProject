"use strict";

// adauga rolurile initiale in tabela roles 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert( // insereaza mai multe randuri in tabel
      "roles",
      [ // fiecare obiect din array reprezinta un rand 
        {
          id: Sequelize.literal("UUID()"),
          name: "USER",
          createdAt: new Date(), // seteaza timpul
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
    await queryInterface.bulkDelete("roles", null, {}); // sterge toate randurile din tabel
  },
};
