const {DataTypes} = require('sequelize');
const sequelize = require('../config/db'); // importar la conexión a la bd

const User = sequelize.define('User', { // definir el modelo User
  id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // no permitir nulos
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // email único
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.INTEGER,
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