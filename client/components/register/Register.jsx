import React from 'react' 
import './Register.css'
import { Input, Button, Heading } from "@chakra-ui/react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Register = ({userRegister, setUserRegister}) => {
  const navigate = useNavigate();

  const handleRegister = (e) => { // Maneja los cambios en los inputs del formulario
    const {name, value} = e.target;
    setUserRegister({...userRegister, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users/createUser', userRegister);
      navigate('/login');      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='container'>
      <div className='register'>
        <Heading>Formulario de registro</Heading>
        <form onSubmit={handleSubmit}>
          <Input
          type='email' 
          placeholder="Email"
          name='email'
          onChange={handleRegister}
          value={userRegister?.email}
           />
          <Input 
          type='password'
          placeholder="Contraseña"
          name='password'
          onChange={handleRegister}
          value={userRegister?.password}
           />
          <Input 
          type='text'
          placeholder="Nombre"
          name='name'
          onChange={handleRegister}
          value={userRegister?.name}
           />
          <Button type="submit">
            Registrarse
          </Button>
        </form>
      </div>
    </div>
  )
}
