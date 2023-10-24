import React from "react"
import { Route, Routes } from "react-router-dom"
import ProductList from "../Pages/ProductList"
import CatsProductList from "../Pages/CatsProductList"
import DogsProductList from "../Pages/DogProductList"
import Login from "../Pages/Login"
import Register from "../Pages/Register"

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/category/gatos" element={<CatsProductList />} />
      <Route path="/products/category/Perro" element={<DogsProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default PublicRoutes
