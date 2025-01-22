const { Sequelize } = require('sequelize'); 

const sequelize = new Sequelize('events_app', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

sequelize.authenticate() 
  .then(() => {
    console.log('Conexiune reușită la baza de date!');
  })
  .catch((err) => {
    console.error('Nu s-a putut conecta la baza de date:', err);
  });

module.exports = sequelize; 

