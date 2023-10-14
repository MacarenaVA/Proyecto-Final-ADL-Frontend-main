import React, { createContext, useContext, useState } from "react"

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ email: null })

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser({ email: null })
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
