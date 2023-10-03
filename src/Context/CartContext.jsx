import React, { createContext, useContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  return (
    <CartContext.Provider value={{ cart, total, setCart, setTotal }}>
      {children}
    </CartContext.Provider>
  )
}
