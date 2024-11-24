const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Role = require("./Role");

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
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datebirth: {
      type: DataTypes.DATE,
    },
    role_id: {
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
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

module.exports = User;
