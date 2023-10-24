import React from "react"
import { Route, Routes } from "react-router-dom"
import Cart from "../Pages/Cart"
import DetailProduct from "../Pages/DetailProduct"
import Profile from "../Pages/Profile"
import ModifyProfile from "../Pages/ModifyProfile"
import Favorites from "../Pages/Favorites"
import CreateProductPost from "../Pages/CreateProductPost"
import MyPosts from "../Pages/MyPost"

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/cart" element={<Cart />} />
      <Route path=":id" element={<DetailProduct />} />
      <Route path="/mi-perfil" element={<Profile />} />
      <Route path="/modificar-perfil" element={<ModifyProfile />} />
      <Route path="/mis-favoritos" element={<Favorites />} />
      <Route path="/crear-publicación" element={<CreateProductPost />} />
      <Route path="/mis-publicaciones" element={<MyPosts />} />
    </Routes>
  )
}

export default PrivateRoutes
