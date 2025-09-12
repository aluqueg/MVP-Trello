const {DataTypes} = require('sequelize');
const sequelize = require('../config/db'); // importar la conexión a la bd

const Boards = sequelize.define('Boards', { // definir el modelo
  id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
  title: {
    type: DataTypes.STRING,
    allowNull: false, // no puede ser nulo
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true, // puede ser nulo
  },
  created_by: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
},
},{
    tableName: 'boards',
    timestamps: false, // desactivar timestamps automáticos
  });
  
module.exports = Boards; // exportar el modelo