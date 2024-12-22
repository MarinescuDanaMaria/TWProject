const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Role = require("./role"); // se importa modelul pt a config relatia 
const EventGroup = require("./EventGroup"); 
//const db= require("../models");

// def model 
module.exports = (sequelize, DataTypes) => {
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      allowNull: false,
    },
    datebirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    role_id: { // cheie externa care face ref la coloana id din tabelul roles 
      type: DataTypes.UUID,
      references: {
        model: "roles",
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    tableName: "USERS",
    timestamps: true,
  }
);

User.associate = (models) => {
  User.hasMany(models.EventGroup, { foreignKey: "idUser", as: "groups" });
  User.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
};

return User;
};
//////////////////////////////////
// asocierea cu role - relatia 
//User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

//module.exports = User;


////
// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     // "User",
//     {
//       id: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4,
//       },
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       tableName: "USERS",
//       timestamps: true,
//     }
//   );

//   User.associate = (models) => {
//     User.hasMany(models.EventGroup, { foreignKey: "idUser", as: "groups" });
//     User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
//   };

//   return User;
// };

