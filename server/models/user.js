const {DataTypes} = require('sequelize');
const sequelize = require('../config/db'); // importar la conexión a la bd

const User = sequelize.define('User', { // definir el modelo User
  id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false, // no permitir nulos
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true, // email único
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  type: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 2, // 1 = admin, 2 = user
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
},
  {
    tableName: 'users',
    timestamps: false, // desactivar timestamps automáticos
  });

module.exports = User; // exportar el modelo