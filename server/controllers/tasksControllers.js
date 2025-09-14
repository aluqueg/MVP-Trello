const Task = require('../models/task');

class TasksControllers {
  //Traer tareas
  async getTasks(req,res){
    try{
      const {tablero_id} = req.params

      if(!tablero_id){
        return res.status(400).json({message: 'Faltan datos'});
      }

      //Obtener tareas del tablero
      const tasks = await Task.findAll({where : {board_id: tablero_id}})
      return res.status(200).json({tasks})
    }catch(error){
      console.error(error);
      return res.status(500).json({message: 'Error al obtener tareas'})
    }
  }

  //Crear tareas
  async createTasks(req,res){
    try{
      const {title, description, type, tablero_id, created_by} = req.body;
      

      if(!title || !type || !tablero_id){
        return res.status(400).json({message: 'Faltan datos'});
      }

      //crear la tarea
      const newTask = await Task.create({
        title,
        description,
        type,
        board_id: tablero_id,
        created_by
      })

      return res.status(201).json({message: 'Tarea creada exitosamente', 
        task: {
          id: newTask.id,
          title: newTask.title,
          description: newTask.description,
          type: newTask.type,
          board_id: newTask.board_id,
          created_by: newTask.created_by
        }
      })
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error al crear la tarea', error})
    }
  }

  //Editar tareas
  async editTasks(req, res){
    const {task_id} = req.params;
    const {title, description, type} = req.body;

    try{
      if(!task_id){
        return res.status(400).json({message: 'Faltan datos'});
      }
      //Editar la tarea
        await Task.update({
          title: title,
          description: description,
          type: type
        },{
          where: {id: task_id}  
        })

        return res.status(200).json({message: 'Tarea editada correctamente'})
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Error al editar la tarea', error})
      }
}

  //Eliminar tareas
  async deleteTasks(req, res){
    const {task_id} = req.params;

    try{
      if(!task_id){
        return res.status(400).json({message: 'Faltan datos'});
      }

      //Eliminar la tarea
        await Task.destroy({
          where: {id: task_id}});

          return res.status(200).json({message: 'Tarea eliminada correctamente'});
    }catch(error){
      console.error(error)
      res.status(500).json({message: 'Error al eliminar la tarea', error});
    }  
  }


}

module.exports = new TasksControllers();