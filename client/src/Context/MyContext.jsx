import React, { createContext, useContext, useState } from "react"

const MyContext = createContext()

export function useMyContext() {
  return useContext(MyContext)
}

export function MyContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [cartProducts, setCartProducts] = useState([])
  const [countProducts, setCountProducts] = useState(0)
  const [total, setTotal] = useState(0)
  const [allProducts, setAllProducts] = useState([])
  const [userPosts, setUserPosts] = useState([]) // Nueva variable

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const updateCart = (products) => {
    setCartProducts(products)
  }

  const contextValue = {
    user,
    cartProducts,
    updateCart,
    countProducts,
    total,
    allProducts,
    setAllProducts,
    userPosts,
    setUserPosts,
    login,
    logout,
  }

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  )
}
