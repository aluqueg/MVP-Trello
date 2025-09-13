import { Box, Button, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ModalCrearTablero } from '../../components/modalCrearTablero/ModalCrearTablero';


const initialTablero = {
  title: "",
  description: ""
}

export const ListaTableros = ({userLogin}) => {
  const [tableros, setTableros] = useState([]);
  const navigate = useNavigate();
  const [nuevoTablero, setNuevoTablero] = useState(initialTablero);
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  const handleCrearTablero = async () =>{
    //Lógica para crear tablero
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

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Tus Tableros
      </Heading>

    {tableros.length === 0 ? (<Text>Todavía no tienes tableros</Text>
    ) : (
      <Stack spacing={3}>
          {tableros.map((t) => (
            <Box
              key={t.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              onClick={() => navigate(`/tablero/${userLogin.id}/${t.id}`)}
            >
              <Heading size="md">{t.title}</Heading>
              <Text>{t.description}</Text>
            </Box>
          ))}
        </Stack>
    )}

    <Button mt={6} colorScheme="teal" onClick={onOpen}>
        Crear Tablero
      </Button>

      <ModalCrearTablero isOpen={isOpen} onClose={onClose} nuevoTablero={nuevoTablero} setNuevoTablero={setNuevoTablero} handleCrearTablero={handleCrearTablero}/>

    </Box>
  )
}
