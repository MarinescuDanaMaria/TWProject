'use strict';

// adauga ut in tabela, asignandu-le roluri aleatorii 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = await queryInterface.sequelize.query( // ret un array de forma [ { id: 'uuid1' }, { id: 'uuid2' } ]

      'SELECT id FROM roles',
      { type: Sequelize.QueryTypes.SELECT }
    ); // executa o interogare sql pt a selecta toate id-urile din tabela roles 

    if (!roles || roles.length === 0) {
      console.log("Nu există roluri în tabela 'roles'. Te rugăm să adaugi unele înainte de a rula seeder-ul.");
      return;
    }

    const users = []; // array gol de users 
    for (let i = 0; i < 10; i++) {  // adauga 10 ut in array
      const randomRoleId = roles[Math.floor(Math.random() * roles.length)].id;

      users.push({
        name: `User ${i + 1}`,
        datebirth: `1990-01-${(i % 31) + 1}`,  
        roleId: randomRoleId,  
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('USERS', users); // insereaza utilizatorii in tabela users
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('USERS', null, {}); // sterge toate randurile din tabela users 
  },
};
