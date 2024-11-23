
const { v4: uuidv4 } = require("uuid");

const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM("USER", "ORGANIZATOR"),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: true,
  }
);
module.exports = Role;
