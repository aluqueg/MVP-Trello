var express = require('express');
var router = express.Router();
const tableroControllers = require('../controllers/tableroControllers');

router.post('/createTablero', tableroControllers.createTablero); // ruta para crear tablero
router.get('/getTableros/:userId?', tableroControllers.getTableros); // ruta para obtener tableros de un usuario

module.exports = router;