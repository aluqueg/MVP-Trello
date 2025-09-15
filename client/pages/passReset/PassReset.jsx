import { Box, Button, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const PassReset = () => {
  const [newPassword, setNewPassword] = useState("")
  const toast = useToast();
  const navigate = useNavigate();

  const handleReset = async () => {
    try{
      const token = localStorage.getItem('resetToken')
      if(!token){
        toast({
          title: "Error",
          description: "No hay token en localStorage",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      await axios.post('http://localhost:3000/api/auth/reset-password', {token, newPassword});

      localStorage.removeItem('resetToken');

      toast({
        title: "Éxito",
        description: "Contraseña actualizada",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate('/login')
    }catch(error){
      toast({
        title: "Error",
        description: error.response?.data?.message || "No se pudo actualizar la contraseña",
        duration: 3000,
        isClosable: true,
      })
    }
  }
  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
      <Heading size="lg" mb={4}>Restablecer Contraseña</Heading>
      <FormControl>
        <FormLabel>Nueva Contraseña</FormLabel>
        <Input
          type="password"
          placeholder="Introduce nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleReset}>
        Guardar Contraseña
      </Button>
    </Box>
  )
}
