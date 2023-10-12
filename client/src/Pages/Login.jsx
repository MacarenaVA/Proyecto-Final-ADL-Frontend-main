import React, { useState } from "react"
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = () => {
    if (email === "usuario@example.com" && password === "contraseña") {
      login({ username: "usuario@example.com" })

      navigate("/mi-perfil")
    } else {
      alert("Credenciales incorrectas")
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
