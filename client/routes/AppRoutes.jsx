import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react'
import { Home } from "../pages/Home/Home";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
    </BrowserRouter>
  )
}
