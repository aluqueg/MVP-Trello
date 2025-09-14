var express = require('express');
var router = express.Router();
const tableroControllers = require('../controllers/tableroControllers');

// ruta para crear tablero
router.post('/createTablero', tableroControllers.createTablero); 

// ruta para obtener tableros de un usuario
router.get('/getTableros/:userId?', tableroControllers.getTableros); 

//ruta para editar tableros
router.put('/updateTableros/:tablero_id', tableroControllers.editTableros)

//ruta para eliminar tableros
router.delete('/deleteTableros/:tablero_id',tableroControllers.deleteTableros)


module.exports = router;