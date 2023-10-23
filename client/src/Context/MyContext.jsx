import React, { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const MyContext = createContext()

const MyContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([])
  const [cartProducts, setCartProducts] = useState([])
  const [countProducts, setCountProducts] = useState(0)
  const [total, setTotal] = useState(0)
  const [user, setUser] = useState({ email: null, id: null })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const updateCart = (updatedProducts) => {
    const newCountProducts = updatedProducts.reduce(
      (count, product) => count + product.qty,
      0
    )
    const newTotal = updatedProducts.reduce(
      (total, product) => total + product.price * product.qty,
      0
    )
    setCountProducts(newCountProducts)
    setTotal(newTotal)
    setCartProducts(updatedProducts)
  }

  const login = async (userData) => {
    try {
      const response = await axios.post("/login", userData)

      if (response.status === 200) {
        const data = response.data
        localStorage.setItem("token", data.token)
        setUser({ email: userData.email, id: data.id })
        setIsAuthenticated(true)
      } else {
        console.error("Error en inicio de sesión:", response.status)
      }
    } catch (error) {
      console.error("Error en inicio de sesión:", error)
    }
  }

  const logout = async () => {
    try {
      await axios.post("/logout")
      localStorage.removeItem("token")
      setUser({ email: null, id: null })
      setIsAuthenticated(false)
      navigate("/login")
    } catch (error) {
      console.error("Error al cerrar la sesión:", error)
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/")
        setAllProducts(response.data)
      } catch (error) {
        console.error("Error al obtener los productos:", error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <MyContext.Provider
      value={{
        allProducts,
        setAllProducts,
        countProducts,
        setCountProducts,
        total,
        setTotal,
        updateCart,
        user,
        setUser,
        login,
        logout,
        isAuthenticated,
        navigate,
        cartProducts,
        setCartProducts,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export { MyContext, MyContextProvider }
