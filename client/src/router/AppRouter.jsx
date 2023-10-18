import React from "react"
import { Route, Routes } from "react-router-dom"
import { MyContextProvider } from "../Context/MyContext"
import ProductList from "../Pages/ProductList"
import Cart from "../Pages/Cart"
import DetailProduct from "../Pages/DetailProduct"
import CatsProductList from "../Pages/CatsProductList"
import DogsProductList from "../Pages/DogProductList"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import Profile from "../Pages/Profile"
import ModifyProfile from "../Pages/ModifyProfile"
import Favorites from "../Pages/Favorites"
import CreateProductPost from "../Pages/CreateProductPost"
import MyPosts from "../Pages/MyPost"

const AppRouter = () => {
  return (
    <>
      <MyContextProvider>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path=":id" element={<DetailProduct />} />
          <Route
            path="/products/category/gatos"
            element={<CatsProductList />}
          />
          <Route
            path="/products/category/Perro"
            element={<DogsProductList />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mi-perfil" element={<Profile />} />
          <Route path="/modificar-perfil" element={<ModifyProfile />} />
          <Route path="/mis-favoritos" element={<Favorites />} />
          <Route path="/crear-publicación" element={<CreateProductPost />} />
          <Route path="/mis-publicaciones" element={<MyPosts />} />
        </Routes>
      </MyContextProvider>
    </>
  )
}

export default AppRouter
