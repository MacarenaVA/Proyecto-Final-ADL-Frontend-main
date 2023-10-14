import React, { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom" // Importa useNavigate

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const navigate = useNavigate() // Obtiene la función navigate
  const [user, setUser] = useState({ email: null })

  const login = (userData) => {
    setUser({ email: userData.email })
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser({ email: null })

    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
