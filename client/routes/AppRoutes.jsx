import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from 'react'
import { Home } from "../pages/Home/Home";
import { Login } from "../components/Login/Login";
import { Tablero } from "../pages/Tablero/Tablero";
import { ListaTableros } from "../pages/ListaTableros/ListaTableros";

const initialLogin = {
  email: "",
  password: "",
  id: null,
  name: "",
  type: null
}

export const AppRoutes = () => {
const [userLogin, setUserLogin] = useState(initialLogin);
const [tablero, setTablero] = useState(null);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={userLogin?.id ? <Tablero/>:<Home/>} />
      <Route path='/login' element={<Login userLogin={userLogin} setUserLogin={setUserLogin} />} />
      <Route path='/tablero' element={<ListaTableros userLogin={userLogin} />}/>
      <Route path='/tablero/:user_id/:tablero_id' element={<Tablero userLogin={userLogin} />} />
    </Routes>
    </BrowserRouter>
  )
}
