import React, { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const MyContext = createContext()

const MyContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([])
  const [cartProducts, setCartProducts] = useState([])
  const [countProducts, setCountProducts] = useState(0)
  const [total, setTotal] = useState(0)
  const [user, setUser] = useState({ email: null, id: null })
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const calcularCountProducts = (products) => {
    return products.reduce((count, product) => count + product.qty, 0)
  }
  const calcularTotal = (products) => {
    return products.reduce(
      (total, product) => total + product.price * product.qty,
      0
    )
  }

  const updateCart = (updatedProducts) => {
    setCartProducts(updatedProducts)
    const newCountProducts = calcularCountProducts(updatedProducts)
    const newTotal = calcularTotal(updatedProducts)

    setCountProducts(newCountProducts)
    setTotal(newTotal)
    updateCart(updatedProducts)

    console.log("updateCart - countProducts:", newCountProducts)
    console.log("updateCart - total:", newTotal)
  }

  const login = (userData) => {
    console.log("Datos del usuario:", userData)
    setUser({ email: userData.email, id: userData.id })
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser({ email: null })
    setIsAuthenticated(false)
    navigate("/login")
  }

  const navigate = useNavigate()

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
