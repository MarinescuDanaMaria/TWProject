const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Participant = sequelize.define(
    "Participant",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      event_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Events", 
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "USERS", 
          key: "id",
        },
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      confirmed_at: {
        type: DataTypes.DATE,
        allowNull: true, 
      },
    },
    {
      tableName: "PARTICIPANTS",
      timestamps: true,
    }
  );

  Participant.associate = (models) => {
    Participant.belongsTo(models.Event, { foreignKey: "event_id", as: "event" });
    Participant.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  return Participant;
};
