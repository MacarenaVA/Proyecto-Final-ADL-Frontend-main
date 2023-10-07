import React, { useState } from "react"
import { Container, Paper, Typography, TextField, Button } from "@mui/material"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [registeredUsers, setRegisteredUsers] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }

    setRegisteredUsers([...registeredUsers, newUser])

    setFormData({
      username: "",
      email: "",
      password: "",
    })

    console.log("Usuario registrado:", newUser)
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Registro de Usuario
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre de usuario"
            name="username"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Correo electrónico"
            name="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            style={{ marginTop: "20px" }}
          >
            Registrar
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Register
