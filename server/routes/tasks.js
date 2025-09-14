var express = require('express');
const tasksControllers = require('../controllers/tasksControllers');
var router = express.Router();

// ruta para obtener tareas de un tablero
router.get('/getTasks/:tablero_id', tasksControllers.getTasks); 

//ruta para crear una tareas
router.post('/createTasks', tasksControllers.createTasks);

//ruta para editar una tarea
router.put('/updateTasks/:task_id', tasksControllers.editTasks);

//ruta para eliminar una tarea
router.delete('/deleteTasks/:task_id', tasksControllers.deleteTasks);

module.exports = router;