require('dotenv').config();
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize( // crear instancia de Sequelize
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
)
module.exports = sequelize;