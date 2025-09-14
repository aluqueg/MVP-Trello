const Board  = require('../models/boards');

class TableroControllers {
  //crar tablero
  async createTablero(req, res) {
    try{
      const {title, description, created_by} = req.body;

      if(!title || !created_by){
        return res.status(400).json({message: 'Faltan datos'});
      }
      // Crear el nuevo tablero
      const newTablero = await Board.create({ 
        title, 
        description, 
        created_by
       });

      return res.status(201).json({
        message: 'Tablero creado exitosamente', 
        tablero: {
          id: newTablero.id,
          title: newTablero.title,
          description: newTablero.description,
          created_by: newTablero.created_by
        }
      })

    }catch(error){
      console.error(error);
      return res.status(500).json({message: 'Error al crear tablero', error})
    }
  }

  //llamar tableros
  async getTableros(req, res) {
    try{
      const {userId} = req.params;

      if(!userId){
        return res.status(400).json({message: 'Faltan datos'});
      }
      // Obtener los tableros del usuario
      const boards = await Board.findAll({ where: { created_by: userId } });

      return res.status(200).json({boards});      
    }catch(error){
      console.error(error);
      return res.status(500).json({message: 'Error al obtener tableros', error})
    }
  }

  //editar tableros
  async editTableros(req, res) {
    const {tablero_id} = req.params;
    const {title, description} = req.body;

    try{
      if(!tablero_id){
      return res.status(400).json({message: 'Faltan datos'})
    }
      //Editar tablero
    await Board.update({
      title: title,
      description: description
    },{
      where: {id: tablero_id}
    })

    return res.status(200).json({message: 'Tablero editado correctamente'})
    }catch(error){
      console.error(error)
      res.status(500).json({message: 'Error al editar la tarea', error})
    }
  }

  async deleteTableros(req, res){
    const {tablero_id} = req.params;

    try{
      if(!tablero_id){
        return res.status(400).json({message: 'Faltan datos'});
      }

      await Board.destroy({
        where: {id: tablero_id}
      })

      return res.status(200).json({message: 'Tablero eliminado correctamente'})
    }catch(error){
      console.error(error)
      res.status(500).json({message: 'Error al eliminar el tablero', error})
    }
  }
}

module.exports = new TableroControllers();