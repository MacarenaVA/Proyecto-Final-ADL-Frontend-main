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

const PublicHeader = ({ cartProductCount }) => {
  const activeClass = ({ isActive }) => (isActive ? "active" : "")

  return (
    <div className="header-container">
      <header>
        <>
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
            <NavLink to="/login">
              <FontAwesomeIcon icon={faUser} />
              Ingresar
            </NavLink>
            <NavLink to="/register">
              <FontAwesomeIcon icon={faUserPlus} />
              Registrarse
            </NavLink>
            <NavLink to="/cart" className="header-r">
              <i className="fa-solid fa-cart-shopping"></i>
              <p className={`cart-num`}>5</p>
            </NavLink>
          </div>
        </>

        <>
          <NavLink to="/cart" className="header-r">
            <i className="fa-solid fa-cart-shopping"></i>
            <p className={`cart-num`}>{cartProductCount}</p>
          </NavLink>
        </>
      </header>
    </div>
  )
}

export default PublicHeader
