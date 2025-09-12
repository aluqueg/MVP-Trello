var express = require('express');
const userControllers = require('../controllers/userControllers');
var router = express.Router();

/* GET users listing. */
router.post('/createUser', userControllers.createUser); // ruta para crear usuario
router.post('/login', userControllers.login); // ruta para login

module.exports = router;
