'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = await queryInterface.sequelize.query( 

      'SELECT id FROM roles',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!roles || roles.length === 0) {
      console.log("Nu există roluri în tabela 'roles'. Te rugăm să adaugi unele înainte de a rula seeder-ul.");
      return;
    }

    const users = []; 
    for (let i = 0; i < 10; i++) { 
      const randomRoleId = roles[Math.floor(Math.random() * roles.length)].id;

      users.push({
        name: `User ${i + 1}`,
        datebirth: `1990-01-${(i % 31) + 1}`,  
        roleId: randomRoleId,  
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('USERS', users); 
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('USERS', null, {}); 
  },
};
