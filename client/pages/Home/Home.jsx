import React from 'react'
import { useState } from 'react';
import { Register } from '../../components/register/Register';


  const initialValue = { // Estado inicial del formulario
    name: "",
    email: "",
    password: "",
  }

export const Home = () => {
  const [userRegister, setUserRegister] = useState(initialValue);

  return (
    <div>
      <Register userRegister={userRegister} setUserRegister={setUserRegister} />
        </div>
  )
}
