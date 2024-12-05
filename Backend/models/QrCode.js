const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

module.exports = (sequelize, DataTypes) => {
  const QrCode = sequelize.define(
    "QrCode",
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
      qr_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "QrCodes",
      timestamps: true,
    }
  );


  QrCode.associate = (models) => {
    QrCode.belongsTo(models.Event, {
      foreignKey: "event_id",
      as: "event",            
    });
  };

  return QrCode;
};
