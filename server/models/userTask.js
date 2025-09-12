const {DataTypes} = require('sequelize');
const sequelize = require('../config/db'); // importar la conexión a la bd

const UserTask = sequelize.define('UserTask', {
  user_id:{
    type: DataTypes.BIGINT,
  },
  task_id:{
    type: DataTypes.BIGINT,
    allowNull: false,
  },  
},{
  tableName: 'user_tasks',
  timestamps: false,
});

module.exports = UserTask;