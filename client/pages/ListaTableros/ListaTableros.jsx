import { Box, Button, Heading, Stack, Text, useDisclosure, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ModalCrearTablero } from '../../components/modalCrearTablero/ModalCrearTablero';
import { ModalEditarTablero } from '../../components/modalEditarTablero/ModalEditarTablero';
import { TiDelete } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";


const initialTablero = {
  title: "",
  description: ""
}

export const ListaTableros = ({userLogin}) => {
  const [tableros, setTableros] = useState([]);
  const navigate = useNavigate();
  const [nuevoTablero, setNuevoTablero] = useState(initialTablero);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tableroEditar, setTableroEditar] = useState(null)
   const { isOpen: isOpenEditar, onOpen: onOpenEditar, onClose: onCloseEditar } = useDisclosure();

  //Cargar los tableros del usuario ID
  useEffect(() => {
    const fetchTableros = async () => {
      try{
        const res = await axios.get(`http://localhost:3000/api/tableros/getTableros/${userLogin.id}`);
        setTableros(res.data.boards || []);
      }catch(error){
        console.error("Error al cargar los tableros", error);
      }
    }

    if(userLogin?.id){
      fetchTableros();
    }
  },[userLogin]);

  //Lógica para crear tablero
  const handleCrearTablero = async () =>{
    try{
      //Llama para crear el tablero
      const res = await axios.post('http://localhost:3000/api/tableros/createTablero', {
        title: nuevoTablero.title,
        description: nuevoTablero.description,
        created_by: userLogin.id,
      });

      //Se actualiza la lista de tableros
      setTableros([...tableros, res.data.tablero]);
      //se cierra modal y se resetea el formulario
      setNuevoTablero(initialTablero),
      onClose();
    }catch(error){
      console.error("Error al crear el tablero", error);
    }
  }

  //Lógica para editar tableros
  const handleEditarTableros = async (tablero) => {
      try{
        const res = await axios.put(`http://localhost:3000/api/tableros/updateTableros/${tablero.id}`,{
          title: tablero.title,
          description: tablero.description
        })

        //refrescamos los tableros para actualizar frontend
        const resTableros = await axios.get(`http://localhost:3000/api/tableros/getTableros/${userLogin.id}`);

        setTableros(resTableros.data.boards || [])
        onCloseEditar();
      }catch(error){
        console.error('Error al editar tablero', error)
      }
    }

    const handleEliminarTableros = async (tablero_id) => {
        try{
          await axios.delete(`http://localhost:3000/api/tableros/deleteTableros/${tablero_id}`)

          //refrescar tableros para el frontend
          const resTableros = await axios.get(`http://localhost:3000/api/tableros/getTableros/${userLogin.id}`)

          setTableros(resTableros.data.boards || [])
        }catch(error){
          console.error('Error al eliminar el tablero', error)
        }
    }

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Tus Tableros
      </Heading>

    {tableros.length === 0 ? (<Text>Todavía no tienes tableros</Text>
    ) : (
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} mt={4}>
          {tableros.map((t) => (
            <Box
              key={t.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              
            >
              <Heading onClick={() => navigate(`/tablero/${userLogin.id}/${t.id}`)} size="md">{t.title}</Heading>
              <Text>{t.description}</Text>
                <Box display="flex" justifyContent="flex-end" p={2} gap={2} >
                 <FaRegEdit onClick={() => {setTableroEditar(t); onOpenEditar();}} />
                 <TiDelete onClick={() => handleEliminarTableros(t.id)} />
                </Box>
            </Box>
          ))}
        </SimpleGrid>
    )}

    <Button mt={6} colorScheme="teal" onClick={onOpen}>
        Crear Tablero
      </Button>

      <ModalCrearTablero isOpen={isOpen} onClose={onClose} nuevoTablero={nuevoTablero} setNuevoTablero={setNuevoTablero} handleCrearTablero={handleCrearTablero}/>

      <ModalEditarTablero isOpen={isOpenEditar} onClose={onCloseEditar} tableroEditar={tableroEditar} setTableroEditar={setTableroEditar} handleEditarTableros={handleEditarTableros}/>

    </Box>
  )
}
