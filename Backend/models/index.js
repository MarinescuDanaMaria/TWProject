'use strict';

// Acest fișier configurează și inițializează modelele Sequelize și 
// le exportă pentru a fi utilizate în alte părți ale aplicației.

const fs = require('fs'); // lucru cu fisiere 
const path = require('path'); // manipulare cai fisiere 
const Sequelize = require('sequelize'); // importa ORM sequelize
const process = require('process'); // acces la var si inf procesului node.js
const basename = path.basename(__filename); // obt numele fisierului curent 
const env = process.env.NODE_ENV || 'development'; // det mediul curent, implicit fol dev
const config = require(__dirname + '/../config/config.json')[env];
// incarca configuratia bd din fisierul config.json specific pt mediul curent
const db = {}; // creeaza un ob db care va contine toate modelele definite

let sequelize;
if (config.use_env_variable) // daca exista o var de mediu specificata pt conexiune, o fol pt init 
  { 
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else  // daca nu, se fol inf din fisierul de config ( db, username, password )
{
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
////////////////////////////
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 && // exclude fisierele ascunse 
//       file !== basename && // exclude fisierul index.js
//       file.slice(-3) === '.js' && // include doar fisierele .js
//       file.indexOf('.test.js') === -1 // exclude fisierele de test 
//     );
//   })
//   .forEach(file => { // incarca fiecare model si il adauga in obiectul db 
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });
///////////////////////\\

////////////// var 2  ////
// fs
//   .readdirSync(__dirname)
//   .filter((file) => {
//     console.log(`Found file: ${file}`); // Log pentru fiecare fișier găsit
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach((file) => {
//     console.log(`Loading model from file: ${file}`);
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     console.log(`Loaded model: ${model.name}`); // Log pentru fiecare model încărcat
//     db[model.name] = model;
//   });

  ////// ----------------------------------

  fs
  .readdirSync(__dirname)
  .filter((file) => {
    console.log(`Found file: ${file}`); // Log pentru fiecare fișier găsit
    return (
      file.indexOf('.') !== 0 && // Exclude fișierele ascunse
      file !== basename && // Exclude fișierul index.js
      file.slice(-3) === '.js' && // Include doar fișierele .js
      file.indexOf('.test.js') === -1 // Exclude fișierele de test
    );
  })
  .forEach((file) => {
    console.log(`Loading model from file: ${file}`);
    try {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      console.log(`Loaded model: ${model.name}`); // Log pentru fiecare model încărcat
      db[model.name] = model;
    } catch (error) {
      console.error(`Error loading model from file: ${file}`, error);
    }
  });




  // asocieri intre modele ( relatii )
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); 
  }
});

/////
console.log("Modelele încărcate în db:", Object.keys(db));
/////


// exporta modelele si instanta sequelize 
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
