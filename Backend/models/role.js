const { v4: uuidv4 } = require("uuid"); // generare id unic pt fiecare rol

const { DataTypes } = require("sequelize"); // tipurile de date suportate de sq
const sequelize = require("../config/sequelize"); // instanta sequelize pt bd

// definitia modelului 
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.UUID, // gen automat 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.ENUM("USER", "ORGANIZATOR"),
        allowNull: false, // valoare obligatorie 
        unique: true, // unica 
      },
    },
    {
      tableName: "roles", // numele tabelului in bd 
      timestamps: true, // ad coloanele createdAt si updatedAt
    }
  );

  // Dacă există asocieri, adaugă-le aici
  Role.associate = (models) => {
    // Exemple de asocieri
    // Role.hasMany(models.User, { foreignKey: "role_id", as: "users" });
  };

  return Role;
};





// definitia modelului 
// const Role = sequelize.define(
//   "Role",
//   {
//     id: {
//       type: DataTypes.UUID, // gen automat 
//       defaultValue: uuidv4,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.ENUM("USER", "ORGANIZATOR"),
//       allowNull: false, // valoare obligatorie 
//       unique: true, // unica 
//     },
//   },
//   {
//     sequelize,
//     modelName: "Role",
//     tableName: "roles", // numele tabelului in bd 
//     timestamps: true, // ad coloanele createdAt si updatedAt
//   }
// );
// module.exports = Role; // exporta modelul 
