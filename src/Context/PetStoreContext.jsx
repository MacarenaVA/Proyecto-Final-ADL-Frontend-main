import React, { createContext, useState } from "react"
import data from "../data/data.json"

export const PetStoreContext = createContext()

export const PetStoreProvider = ({ children }) => {
  const [products, setProducts] = useState(data.productos)
  const [total, setTotal] = useState(0)

  return (
    <PetStoreContext.Provider value={{ products, total }}>
      {children}
    </PetStoreContext.Provider>
  )
}
