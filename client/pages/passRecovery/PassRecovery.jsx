import { Box, Button, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const PassRecovery = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate();
  const toast = useToast();

  const handleRecover = async () => {
    try{
      //envio de mail al back
      const res = await axios.post('http://localhost:3000/api/auth/recover', {email});
      //guardar token en el localstorage
      localStorage.setItem("resetToken", res.data.token)
      //mensaje temporal
      toast({
        title: "Token generado",
        description: "Se ha guardado en localStorage",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate('/passReset')
    }catch(error){
          //mensaje temporal de error
          toast({
            title: "Error",
            description: error.response?.data?.message || "No se pudo generar el token",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
    }
  }

  return (
 <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
      <Heading size="lg" mb={4}>Recuperar Contraseña</Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Introduce tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleRecover}>
        Enviar
      </Button>
    </Box>
  )
}
