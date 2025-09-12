var express = require('express');
const userControllers = require('../controllers/userControllers');
var router = express.Router();

/* GET users listing. */
router.post('/createUser', userControllers.createUser); // ruta para crear usuario

module.exports = router;
