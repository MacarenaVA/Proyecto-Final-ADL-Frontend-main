import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCat,
  faDog,
  faHouse,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"
import { MyContext } from "../Context/MyContext"
import logo from "../assets/logo.png"

const Header = () => {
  const { isAuthenticated, logout, countProducts } = useContext(MyContext)

  const activeClass = ({ isActive }) => (isActive ? "active" : "")

  const renderAuthLinks = () => {
    if (isAuthenticated) {
      return (
        <>
          <NavLink to="/mi-perfil">
            <FontAwesomeIcon icon={faUser} />
            Perfil
          </NavLink>
          <NavLink to="/" onClick={handleLogout}>
            <FontAwesomeIcon icon={faUser} />
            Cerrar Sesión
          </NavLink>
        </>
      )
    } else {
      return (
        <>
          <NavLink to="/login">
            <FontAwesomeIcon icon={faUser} />
            Ingresar
          </NavLink>
          <NavLink to="/register">
            <FontAwesomeIcon icon={faUserPlus} />
            Registrarse
          </NavLink>
        </>
      )
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="header-container">
      <header>
        <div className="header-l">
          <NavLink to="/">
            <img src={logo} alt="logo" className="logo" />
          </NavLink>
        </div>
        <div className="header-c">
          <NavLink className={activeClass} to="/">
            <FontAwesomeIcon icon={faHouse} />
            Inicio
          </NavLink>
          <NavLink to="/products/category/gatos">
            <FontAwesomeIcon icon={faCat} />
            Gatos
          </NavLink>
          <NavLink to="/products/category/Perro">
            <FontAwesomeIcon icon={faDog} />
            Perros
          </NavLink>
          {renderAuthLinks()}
        </div>
        <NavLink className={activeClass} to="/cart">
          <div className="header-r">
            <FontAwesomeIcon icon="cart-shopping" />
            <p className="cart-num">{countProducts}</p>
          </div>
        </NavLink>
      </header>
    </div>
  )
}

export default Header
