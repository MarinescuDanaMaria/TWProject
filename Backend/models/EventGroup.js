const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./User");
const Event = require("./Event");
//const db=require("../models");

// def model

module.exports = (sequelize, DataTypes) => {
  const EventGroup = sequelize.define(
    "EventGroup",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idUser: {
        type: DataTypes.UUID,
        references: {
          model: "USERS",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      tableName: "EVENTGROUPS",
      timestamps: true,
    }
  );

  EventGroup.associate = (models) => {
    // Relație cu User (organizer)
    EventGroup.belongsTo(models.User, {
      foreignKey: "idUser",
      as: "organizer",
    });

    // Relație cu Event
    EventGroup.hasMany(models.Event, { foreignKey: "idGroup", as: "events" });
  };

  return EventGroup;

  // module.exports = EventGroup;
};
