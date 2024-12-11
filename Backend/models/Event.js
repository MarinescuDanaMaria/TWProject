// id, name, description, status (  open /closed ), startTime,  endTime , idGroup ( fk )

const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const EventGroup = require("./EventGroup"); // Importă modelul EventGroup

    module.exports = (sequelize, DataTypes) => {
      const Event = sequelize.define(
        "Event",
        {
          id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
          },
          name: {
            type: DataTypes.STRING,
          },
          description: {
            type: DataTypes.STRING,
          },
          status: {
            type: DataTypes.ENUM("OPEN", "CLOSED"),
            allowNull: false,
            defaultValue: "CLOSED"
          },
          startTime: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          endTime: {
            type: DataTypes.DATE,
          },
          idGroup: {
            type: DataTypes.UUID,
            references: {
              model: "EventGroups", 
              key: "id",
            },
            allowNull: false,
          },
        },
        {
          tableName: "EVENTS",
          timestamps: true,
        }
      );
    
      Event.associate = (models) => {
        Event.belongsTo(models.EventGroup, { foreignKey: "idGroup", as: "group" });
      };
    
      return Event;

        //module.exports = Event;
    };
    