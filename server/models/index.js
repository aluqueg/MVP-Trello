const sequelize = require('../config/db');
const User = require('./user');
const Boards = require('./boards');
const Tasks = require('./tasks');
const UserTasks = require('./userTasks');

// definir las relaciones entre las tablas
User.hasMany(Boards,{foreignKey: 'created_by'});
Boards.belongsTo(User,{foreignKey: 'created_by'});

// una tabla puede tener muchas tareas
Boards.hasMany(Tasks,{foreignKey: 'board_id'});
Tasks.belongsTo(Boards,{foreignKey: 'board_id'});

// un usuario puede crear muchas tareas
User.hasMany(Tasks,{foreignKey: 'created_by'});
Tasks.belongsTo(User,{as: 'creator', foreignKey: 'created_by'});

// una tarea puede ser asignada a muchos usuarios y un usuario puede tener muchas tareas (relación muchos a muchos)
User.belongsToMany(Tasks,{through: UserTasks, foreignKey: 'user_id'});
Tasks.belongsToMany(User,{through: UserTasks, foreignKey: 'task_id'});

module.exports = {
  sequelize,
  User,
  Boards,
  Tasks,
  UserTasks
};