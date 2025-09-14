import { Box, Button, Heading, Text, SimpleGrid, VStack, Card, CardBody, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ModalCrearTarea } from '../../components/modalCrearTarea/ModalCrearTarea';
import { TiDelete } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";

const initialTarea = {
  title: "",
  description: "",
  type: 1, // 1: pendiente, 2: en progreso, 3: hecho
  tablero_id: null,
  created_by: null
}

export const Tablero = ({userLogin}) => {
  const {user_id, tablero_id} = useParams();
  const [currentTablero, setCurrentTablero] = useState(null);
  const [tasks, setTasks] = useState({pending: [], inProgress: [], done: []});
  const navigate = useNavigate();
  const [nuevaTarea, setNuevaTarea] = useState(initialTarea)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
  const fetchTableroAndTasks = async () => {
    try {
      //llamada para datos del tablero
      const resTableros = await axios.get(`http://localhost:3000/api/tableros/getTableros/${user_id}`);
      //filtrado del tablero con el ID
      const tableroEncontrado = resTableros.data.boards.find((b) => b.id === parseInt(tablero_id));
      //si se encuentra, se setea
      if (tableroEncontrado) {
        setCurrentTablero(tableroEncontrado);
      }

      //Obtener tareas del tablero
      const resTasks = await axios.get(`http://localhost:3000/api/tasks/getTasks/${tablero_id}`);

      //Organizar tareas por estado 1 pendiente, 2 en progreso, 3 hechas
      const pending = resTasks.data.tasks.filter((t)=> t.type === 1);
      const inProgress = resTasks.data.tasks.filter((t)=> t.type === 2);
      const done = resTasks.data.tasks.filter((t)=> t.type === 3);

      //Setear las tareas
      setTasks({pending, inProgress, done})
    } catch (error) {
      console.error("Error al cargar el tablero", error);
    }
  };
  
  if (user_id && tablero_id) {
    fetchTableroAndTasks();
  }
}, [user_id, tablero_id]);

if (!currentTablero){
  return (
    <Box p={6} textAlign="center">
        <Heading size="md">No se encontró el tablero</Heading>
      </Box>
  )
}

  const handleCrearTarea = async () => {
    //Lógica para crear tarea
    try{
      const res = await axios.post('http://localhost:3000/api/tasks/createTasks', {
        title: nuevaTarea.title,
        description: nuevaTarea.description,
        type: nuevaTarea.type,
        tablero_id: currentTablero.id,
        created_by: user_id
      })

      //Actualizar lista de tareas
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        // Agregar la nueva tarea a la columna correspondiente
        if (nuevaTarea.type === 1) {
          updatedTasks.pending.push(res.data.task);
        } else if (nuevaTarea.type === 2) {
          updatedTasks.inProgress.push(res.data.task);
        } else if (nuevaTarea.type === 3) {
          updatedTasks.done.push(res.data.task);
        }
        return updatedTasks;
      });

      //Cerrar modal y resetear formulario
      setNuevaTarea(initialTarea);
      onClose();
    }catch(error){
      console.error("Error al crear la tarea", error);
    }

  }

  const handleEditarTarea = () => {
    try{
      const res = axios.put(`http://localhost:3000/api/tasks/updateTasks/${tasks.id}`)
    }catch(error){

    }
  }

  const handleVolver = () => {
    navigate('/tablero')
  }

  return (
     <Box p={6}>
      <Heading>{currentTablero.title}</Heading>
      <Text mt={2}>{currentTablero.description}</Text>
      <Text mt={4} color="gray.500">
        Creado por: {userLogin?.name || "Desconocido"} (User ID: {user_id})
      </Text>

      {/* Kanban Grid */}
      <SimpleGrid columns={3} spacing={6} mt={8}>
        {/* Pendiente */}
        <VStack align="stretch">
          <Heading size="sm" color="red.500">Pendiente</Heading>
          {tasks.pending.map((task) => (
            <Card key={task.id}>
              <CardBody>
                <Heading size="xs">{task.title}</Heading>
                <Text fontSize="sm">{task.description}</Text>
              </CardBody>
              <Box display="flex" justifyContent="flex-end" p={2} gap={2} >
                <FaRegEdit onClick={handleEditarTarea(task)} />
                <TiDelete onClick={handleEliminarTarea} />
              </Box>
            </Card>
          ))}
        </VStack>

        {/* En proceso */}
        <VStack align="stretch">
          <Heading size="sm" color="orange.500">En proceso</Heading>
          {tasks.inProgress.map((task) => (
            <Card key={task.id}>
              <CardBody>
                <Heading size="xs">{task.title}</Heading>
                <Text fontSize="sm">{task.description}</Text>
              </CardBody>
              <Box display="flex" justifyContent="flex-end" p={2} gap={2} >
                <FaRegEdit />
                <TiDelete />
              </Box>
            </Card>
          ))}
        </VStack>

        {/* Terminadas */}
        <VStack align="stretch">
          <Heading size="sm" color="green.500">Terminada</Heading>
          {tasks.done.map((task) => (
            <Card key={task.id}>
              <CardBody>
                <Heading size="xs">{task.title}</Heading>
                <Text fontSize="sm">{task.description}</Text>
              </CardBody>
              <Box display="flex" justifyContent="flex-end" p={2} gap={2} >
                <FaRegEdit />
                <TiDelete />
              </Box>
            </Card>
          ))}
        </VStack>
      </SimpleGrid>

      <Box mt={6} gap={4} display="flex" flexDirection="row" justifyContent="center">
        <Button mt={6} colorScheme="teal" onClick={handleVolver}>
          Volver a la lista de tableros
        </Button>
        <Button mt={6} colorScheme="teal" onClick={onOpen}>
          Crear nueva tarea
        </Button>

          <ModalCrearTarea isOpen={isOpen} onClose={onClose} nuevaTarea={nuevaTarea} setNuevaTarea={setNuevaTarea} handleCrearTarea={handleCrearTarea}/>

      </Box>
    </Box>
  )
}
