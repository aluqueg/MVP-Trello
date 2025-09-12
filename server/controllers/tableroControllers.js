const Board  = require('../models/boards');

class TableroControllers {
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
}