import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const ListaTableros = ({userLogin}) => {

  const [tableros, setTableros] = useState([]);
  const navigate = useNavigate();

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
  },[userLogin])

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

    <Button mt={6} colorScheme="teal">
        Crear Tablero
      </Button>

    </Box>
  )
}
