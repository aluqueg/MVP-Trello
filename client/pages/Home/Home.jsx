import React from 'react'
import { useState } from 'react';
import { Register } from '../../components/register/Register';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


  const initialValue = { // Estado inicial del formulario
    name: "",
    email: "",
    password: "",
  }

export const Home = () => {
  const [userRegister, setUserRegister] = useState(initialValue);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  }

  const handlePassRecovery = () => {
    navigate('/passRecovery')
  }


  return (
    <div>
      <Register userRegister={userRegister} setUserRegister={setUserRegister} />
      <Box margin={4} onClick={handleClick}>
        <a href="">Ya estás registrado?</a>
        </Box>
        <Box margin={4} onClick={handlePassRecovery}>
          <a href="">Recuperar contraseña</a>
        </Box>
      </div>
  )
}
