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
}
  async login(req, res) {
    try{
      const {email, password} = req.body;

      // Verificar que se hayan proporcionado email y password
      if(!email || !password){
        return res.status(400).json({message: 'Credenciales incorrectas'});
      }
      // Buscar el usuario por email
      const user = await User.findOne({where: {email}});
      if(!user){
        return res.status(400).json({message: 'usuario no encontrado'});
      }

      // Verificar la contraseña
      const validPassword = await bcrypt.compare(password, user.password_hash);
      if(!validPassword){
        return res.status(400).json({message: 'Crendenciales incorrectas'});
      }

      // Si todo es correcto, devolver los datos del usuario (sin la contraseña)
      return res.status(200).json({
          user: {
          id: user.id,
          email: user.email,
          name: user.name,
          type: user.type
      }
    });

    }catch(error){
      console.error(error);
      return res.status(500).json({message: 'Error al iniciar sesión', error});
    }
}
}



  module.exports = new userControllers;