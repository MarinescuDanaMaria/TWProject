const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Role = require("./role"); 
const EventGroup = require("./EventGroup"); 

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

User.associate = (models) => {
  User.hasMany(models.EventGroup, { foreignKey: "idUser", as: "groups" });
  User.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
  User.hasMany(models.Participant, { foreignKey: "user_id", as: "participants" });

};

return User;
};
