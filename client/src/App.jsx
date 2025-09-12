
import { useState } from 'react';
import { Register } from '../components/register/Register';
import './App.css'

  const initialValue = { // Estado inicial del formulario
    name: "",
    email: "",
    password: "",
  }

function App() {
  const [userRegister, setUserRegister] = useState(initialValue);

  return (    
    <div>
  <Register userRegister={userRegister} setUserRegister={setUserRegister} />
    </div>
  )
}

export default App
