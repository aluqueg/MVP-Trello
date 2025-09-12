import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from 'react'
import { Home } from "../pages/Home/Home";
import { Login } from "../components/Login/Login";
import { Tablero } from "../pages/Tablero/Tablero";

const initialLogin = {
  email: "",
  password: "",
  id: null,
  name: "",
  type: null
}

export const AppRoutes = () => {
const [userLogin, setUserLogin] = useState(initialLogin);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={userLogin ? <Tablero/>:<Home/>} />
      <Route path='/login' element={<Login userLogin={userLogin} setUserLogin={setUserLogin} />} />
      <Route path='/tablero' element={<Tablero />} />
    </Routes>
    </BrowserRouter>
  )
}
