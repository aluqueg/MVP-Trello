var express = require('express');
const tasksControllers = require('../controllers/tasksControllers');
var router = express.Router();

// ruta para obtener tareas de un tablero
router.get('/getTasks/:tablero_id', tasksControllers.getTasks); 

//ruta para crear una tareas
router.post('/createTask', tasksControllers.createTasks);

module.exports = router;