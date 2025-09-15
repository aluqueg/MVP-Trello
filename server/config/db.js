require('dotenv').config();
const {Sequelize} = require('sequelize');

//Conexion a bd
const sequelize = new Sequelize( // crear instancia de Sequelize
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
)
module.exports = sequelize;
/*
// crear la conexión a la bd
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// conectar a la bd
connection.connect((err) => {
  if (err) {
    throw err;
  }else{
    console.log('Conexión a db correcta');
  }    
  })

  module.exports = connection;
  */