const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  class Role extends Model {}

  Role.init(
    {
      id: {
        type: DataTypes.UUID, // UUID pentru identificator unic
        defaultValue: uuidv4, // Generează automat UUID
        primaryKey: true,
      },
      name: {
        type: DataTypes.ENUM('USER', 'ORGANIZATOR'), // Enum pentru numele rolului
        allowNull: false,
        unique: true, // Fiecare rol trebuie să fie unic
      },
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
      timestamps: false, // Dacă nu vrei câmpurile createdAt/updatedAt
    }
  );

  return Role;
};
