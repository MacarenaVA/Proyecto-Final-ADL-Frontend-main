// PrivateHeader.js
import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCat,
  faDog,
  faHouse,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"

const PrivateHeader = ({ logout, cartProductCount }) => {
  const activeClass = ({ isActive }) => (isActive ? "active" : "")

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
          <NavLink to="/mi-perfil">
            <FontAwesomeIcon icon={faUser} />
            Perfil
          </NavLink>
          <NavLink to="/" onClick={handleLogout}>
            <FontAwesomeIcon icon={faUser} />
            Cerrar Sesión
          </NavLink>
        </div>
        <NavLink to="/cart" className="header-r">
          <i className="fa-solid fa-cart-shopping"></i>
          <p className={`cart-num ${cartProductCount}`}>{cartProductCount}</p>
        </NavLink>
      </header>
    </div>
  )
}

export default PrivateHeader