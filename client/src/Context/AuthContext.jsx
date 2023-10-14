import React, { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState({ email: null })
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (userData) => {
    setUser({ email: userData.email })
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser({ email: null })
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}
