import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material"

const Login = () => {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [user, setLocalUser] = useState({ email: "", password: "" })

  const handleSetUser = (e) => {
    const { value, name } = e.target
    setLocalUser({ ...user, [name]: value })
  }

  const handleLogin = async () => {
    const urlServer = "http://localhost:3000"
    const endpoint = "/login"
    const { email, password } = user
    try {
      if (!email || !password)
        return alert("Email y contraseña son obligatorias")
      const response = await axios.post(`${urlServer}${endpoint}`, user)
      const { data: token } = response
      alert("Usuario identificado con éxito")
      localStorage.setItem("token", token)
      setUser()
      navigate("/mi-perfil")
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`)
      } else {
        alert("Ocurrió un error al iniciar sesión")
      }
    }
  }

  return (
    <Container sx={{ p: "2rem" }}>
      <Paper elevation={15} sx={{ width: "70%", margin: "0 auto" }}>
        <Box sx={{ flexGrow: 1, display: "grid", gap: 4, p: 3 }}>
          <Typography variant="h4" textAlign="center" sx={{ my: 2 }}>
            Iniciar Sesión
          </Typography>
          <TextField
            label="Correo Electrónico"
            type="email"
            name="email"
            value={user.email}
            onChange={handleSetUser}
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            value={user.password}
            onChange={handleSetUser}
            fullWidth
          />
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            fullWidth
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
