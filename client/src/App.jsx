import React, { useContext } from "react"
import { MyContext } from "./Context/MyContext"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import PublicRoutes from "./router/PublicRoutes"
import PrivateRoutes from "./router/PrivateRoutes"
import Footer from "./components/Footer"
import Login from "./components/Login"

function App() {
  const { isAuthenticated } = useContext(MyContext)

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />

        {isAuthenticated ? ( // Verifica si el usuario está autenticado
          <Route path="/mi-perfil/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
