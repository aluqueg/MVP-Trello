const User = require('../models/User');
const bcrypt = require('bcrypt');


class userControllers {
  async createUser(req, res) {
    try{
      const {email, password, name} = req.body;

      if(!email || !password || !name){
        return res.status(400).json({message: 'Faltan datos'});
      }

      // Verificar si el usuario ya existe
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      // Hashear la contraseña
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      // Crear el nuevo usuario
      const newUser = await User.create({ 
        email, 
        password_hash: hash, 
        name,
        type: 2  // Asignar el tipo de usuario (2 para usuarios normales)
       });

      return res.status(201).json({ 
        message: 'Usuario creado exitosamente', 
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          type: newUser.type
        }
       });
    }catch(error){
      console.error(error);
      return res.status(500).json({message: 'Error al crear usuario', error})
    }
}}

  module.exports = new userControllers;