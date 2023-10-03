import { useContext, useState } from "react"
import { Box } from "@mui/system"
import {
  Container,
  Button,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material"
import { NavLink } from "react-router-dom"

import logo from "../../assets/img/navbar-logo.png"
import MenuIcon from "@mui/icons-material/Menu"

import NavListDrawer from "./NavListDrawer"
import CartDrawer from "../menuCart/CartDrawer"

import { AuthContext } from "../../Context/AuthProvider"

import { useNavigate } from "react-router-dom"

const activeStyle = {
  color: "#E8D5C4",
}

const activeLink = ({ isActive }) =>
  isActive ? activeStyle : { color: "#EEEEEE" }

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { to: "/perros", text: "Perros", private: false },
    { to: "/gatos", text: "Gatos", private: false },
    { to: "/login", text: "Iniciar Sesion", private: false, publicOnly: true },
    { to: "/register", text: "Regristarse", private: false, publicOnly: true },
    { to: "/cart", text: "Carro", private: false, publicOnly: true },
    { to: "/dashboard", text: "Dashboard", private: true },
  ]

  const { user, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "primary", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              position: "sticky",
            }}
          >
            <IconButton
              color="inherit"
              size="small"
              edge="start"
              aria-label="menu"
              onClick={() => {
                !open ? setOpen(true) : setOpen(false)
              }}
              sx={{ display: { xs: "flex", sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              sx={{ flexGrow: 0.1, textDecoration: "none", color: "inherit" }}
              variant="h5"
              component={NavLink}
              to={"/"}
            >
              <img width="100px" src={logo}></img>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              {navLinks.map((item) => {
                if (item.private && !user) return null
                if (item.publicOnly && user) return null
                return (
                  <Button
                    color="inherit"
                    key={item.text}
                    component={NavLink}
                    to={item.to}
                    style={activeLink}
                    sx={{ mx: "0.5rem" }}
                  >
                    {item.text}
                  </Button>
                )
              })}
              {user && (
                <Button
                  color="inherit"
                  sx={{ mx: "0.5rem" }}
                  onClick={() => {
                    logout()
                    navigate("/")
                  }}
                >
                  Cerrar Sesion
                </Button>
              )}
            </Box>
            <CartDrawer />
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        open={open}
        anchor="top"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "block", sm: "none" }, height: 100 }}
      >
        <NavListDrawer navLinks={navLinks} />
      </Drawer>
    </>
  )
}
