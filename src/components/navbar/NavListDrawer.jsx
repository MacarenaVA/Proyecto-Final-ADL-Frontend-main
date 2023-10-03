/* eslint-disable react/prop-types */
import { Box } from "@mui/system"
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Toolbar,
} from "@mui/material"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthProvider"

export default function NavListDrawer({ setOpen }) {
  const navLinks = [
    { to: "/perros", text: "Perros", private: false },
    { to: "/gatos", text: "Gatos", private: false },
    { to: "/login", text: "Iniciar Sesion", private: false, publicOnly: true },
    { to: "/register", text: "Regristarse", private: false, publicOnly: true },
    { to: "/dashboard", text: "Perfil", private: true },
  ]

  const { user, logout } = useContext(AuthContext)

  return (
    <Box mt="1rem">
      <nav>
        <Toolbar></Toolbar>
        <List>
          {navLinks.map((item) => {
            if (item.private && !user) return null
            if (item.publicOnly && user) return null
            return (
              <ListItem key={item.text}>
                <ListItemButton
                  component={NavLink}
                  to={item.to}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText primary={item.text}></ListItemText>
                </ListItemButton>
              </ListItem>
            )
          })}
          {user && (
            <ListItem>
              <ListItemButton
                component={NavLink}
                // to={/logout}
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
              >
                <ListItemText primary={"Cerrar Sesion"}></ListItemText>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </nav>
    </Box>
  )
}
