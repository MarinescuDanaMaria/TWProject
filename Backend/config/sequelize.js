// config.json = fisier de configurare pt Sequelize - contine mediile de lucru ( development, test , production )

// acest fisier initializeaza o conexiune cu baza de date 

const { Sequelize } = require('sequelize'); // importa clasa Sequelize

const sequelize = new Sequelize('events_app', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});
// creeaza o instanta pentru baza de date events_app cu toate atrib

sequelize.authenticate() // testeaza conexiunea la baza de date 
  .then(() => {
    console.log('Conexiune reușită la baza de date!');
  })
  .catch((err) => {
    console.error('Nu s-a putut conecta la baza de date:', err);
  });

module.exports = sequelize; // exporta instanta pt a fi ut in alte parti 

