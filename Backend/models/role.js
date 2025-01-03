const { v4: uuidv4 } = require("uuid"); 

const { DataTypes } = require("sequelize"); 
const sequelize = require("../config/sequelize");


module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.ENUM("USER", "ORGANIZATOR"),
        allowNull: false, 
        unique: true, 
      },
    },
    {
      tableName: "roles", 
      timestamps: true, 
    }
  );

  return Role;
};
