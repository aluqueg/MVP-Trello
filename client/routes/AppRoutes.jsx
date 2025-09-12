import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from 'react'
import { Home } from "../pages/Home/Home";
import { Login } from "../components/Login/Login";
import { Tablero } from "../pages/Tablero/Tablero";

const initialLogin = {
  email: "",
  password: "",
}

export const AppRoutes = () => {
const [userLogin, setUserLogin] = useState(initialLogin);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={userLogin ? <Home/>:<Tablero />} />
      <Route path='/login' element={<Login userLogin={userLogin} setUserLogin={setUserLogin} />} />
    </Routes>
    </BrowserRouter>
  )
}
