const connection = require('../config/db');
const bcrypt = require('bcrypt');


class userControllers {
  createUser(req, res) {
    let user = req.body; // capturar datos del body
    const { email, password } = user; // destructuring
    if (!email || !password) { // validar que vengan los datos
      return res.status(400).json({ message: "Faltan datos" });
    }else{
      let saltRounds = 10; // número de rondas de saltRounds
      bcrypt.hash(password,saltRounds, (err, hash) => { // hashear la contraseña
        if(err){ // manejar error
          return res.status(500).json({ message: "Error al hashear la contraseña" });
         }else{
          let data = [email, hash]; // datos a insertar
          let sql = "INSERT INTO users (email, password) VALUES (?,?)"; // query  
          connection.query(sql, data, (err, results) => { // ejecutar query
            if(err){ // manejar error
              return res.status(500).json({ message: "Error al insertar el usuario" });
            }else{
              return res.status(201).json({ message: "Usuario creado", userId: results.insertId });
            }          
         })}
    })
  }
}}

  module.exports = new userControllers;