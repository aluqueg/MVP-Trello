const {DataTypes} = require('sequelize');
const sequelize = require('../config/db'); // importar la conexión a la bd

const Task = sequelize.define('Task', {
  id:{
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  title:{
    type: DataTypes.STRING(200),
    allowNull: false,
},
  description:{
    type: DataTypes.TEXT,
},
  type:{
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1 // 1: pendiente, 2: en proceso, 3: terminada
},
  board_id:{
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },  
},{
  tableName: 'tasks',
  timestamps: false
});// definir el modelo

module.exports = Task; // exportar el modelo