const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES

class AuthControllers {

  //Recuperar password
  async recoverPassword(req, res){
    try{
      const {email} = req.body;
      //comprobar si coincide el email
      const user = await User.findOne({where: {email}});

      if(!user){
        return res.status(404).json({message: 'Usuario no encontrado'})
      }

      //Generar token con JWT
      const token = jwt.sign(
        {id: user.id},
        JWT_SECRET,
        {expiresIn: JWT_EXPIRES}
      )

      //se manda el token al front
      res.status(200).json({message: 'Token generado', token})

    }catch(error){
      console.error(error)
      res.status(500).json({message: 'Error en recoverPassword'})
    }
  }

  //resetear password
  async resetPassword(req, res){
    try{
      const {token, newPassword} = req.body
      //verificar token
      const decoded = jwt.verify(token, JWT_SECRET)

      //coincidencia de clave primaria con id
      const user = await User.findByPk(decoded.id)
      if(!user){
        return res.status(404).json({message: 'Usuario no encontrado'})
      }

      //Hasheo del pass
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
      user.password_hash = hashedPassword
      await user.save();

      res.status(200).json({message: 'Contraseña actualizada correctamente'})
    }catch(error){
      console.error(error)

      if(error.name === "TokenExpiredError"){
        return res.status(400).json({message: 'El token ha expirado'})
      }

      res.status(500).json({message: 'Error en resetPassword'})
    }
  }

}

module.exports = new AuthControllers();