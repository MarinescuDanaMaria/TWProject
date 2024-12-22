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
          model: "Events", // Se referă la tabela EVENTS
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "USERS", // Se referă la tabela USERS
          key: "id",
        },
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      confirmed_at: {
        type: DataTypes.DATE,
        allowNull: true, // Inițial `null` până când se confirmă
      },
    },
    {
      tableName: "PARTICIPANTS",
      timestamps: true, // Adaugă createdAt și updatedAt
    }
  );

  Participant.associate = (models) => {
    Participant.belongsTo(models.Event, { foreignKey: "event_id", as: "event" });
    Participant.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  return Participant;
};
