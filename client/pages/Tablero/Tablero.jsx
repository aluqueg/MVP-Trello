import { Box, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Tablero = ({userLogin}) => {
  const {user_id, tablero_id} = useParams();
  console.log(user_id, tablero_id);
  const [currentTablero, setCurrentTablero] = useState(null);

  useEffect(() => {
  const fetchTablero = async () => {
    try {
      //llamada para datos del tablero
      const res = await axios.get(`http://localhost:3000/api/tableros/getTableros/${user_id}`);

      //filtrado del tablero con el ID
      const tableroEncontrado = res.data.boards.find((b) => b.id === parseInt(tablero_id));


      if (tableroEncontrado) {
        setCurrentTablero(tableroEncontrado);
      }
    } catch (error) {
      console.error("Error al cargar el tablero", error);
    }
  };
  
  if (user_id && tablero_id) {
    fetchTablero();
  }
}, [user_id, tablero_id]);

if (!currentTablero){
  return (
    <Box p={6} textAlign="center">
        <Heading size="md">No se encontró el tablero</Heading>
      </Box>
  )
}

  return (
     <Box p={6}>
      <Heading>{currentTablero.title}</Heading>
      <Text mt={2}>{currentTablero.description}</Text>
      <Text mt={4} color="gray.500">
        Creado por: {userLogin?.name || "Desconocido"} (User ID: {user_id})
      </Text>
    </Box>
  )
}
