var express = require('express');
const authControllers = require('../controllers/authControllers');
var router = express.Router();


//ruta para comprobar mail
router.post('/recover', authControllers.recoverPassword);

//ruta para resetear recoverPassword
router.post('/reset-password', authControllers.resetPassword);

module.exports = router;