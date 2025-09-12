import React from 'react' 
import './Register.css'
import { Input, Button, Center } from "@chakra-ui/react"
import axios from 'axios'


export const Register = ({userRegister, setUserRegister}) => {

  const handleRegister = (e) => { // Maneja los cambios en los inputs del formulario
    const {name, value} = e.target;
    setUserRegister({...userRegister, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users/createUser', userRegister);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='container'>
      <div className='register'>
        <h1>Formulario de registro</h1>
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
          <Button onClick={handleSubmit}>
            Registrarse
          </Button>
        </form>
      </div>
    </div>
  )
}
