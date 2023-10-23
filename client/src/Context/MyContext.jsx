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

  const navigate = useNavigate()

  const validateToken = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const response = await axios.post("/validate-token", { token })
        if (response.status === 200) {
          const data = response.data
          setUser({ email: data.email, id: data.id })
        } else {
          console.error("Error en validación de token:", response.status)
          // Limpiar el token si no es válido
          localStorage.removeItem("token")
        }
      } catch (error) {
        console.error("Error en validación de token:", error)
      }
    }
  }

  const updateCart = (updatedProducts) => {
    // ... (resto del código como antes)
  }

  const login = async (userData) => {
    // ... (resto del código como antes)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser({ email: null, id: null })
    navigate("/login")
  }

  useEffect(() => {
    const fetchProducts = async () => {
      // ... (resto del código como antes)
    }

    fetchProducts()

    // Validar el token al cargar la aplicación
    validateToken()
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
