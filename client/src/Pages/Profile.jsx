import React, { useState, useContext } from "react"
import { Link, Navigate } from "react-router-dom"
import MyContext from "../Context/MyContext"
import ModifyProfile from "../Pages/ModifyProfile"
import Favorites from "../Pages/Favorites"
import CreateProductPost from "./CreateProductPost"
import MyPosts from "./MyPost"
import "../App.css"

function Profile() {
  const { user, isAuthenticated, logout, login } = useContext(MyContext)
  const [selectedLink, setSelectedLink] = useState("Mi Perfil")
  const contentMap = {
    "Mi Perfil": `Bienvenido, ${user.email}.`,
    "Modificar Perfil": <ModifyProfile />,
    "Mis Favoritos": <Favorites />,
    "Crear Publicación": <CreateProductPost />,
    "Mis Publicaciones": <MyPosts />,
  }

  const handleLinkClick = (link) => {
    setSelectedLink(link)
  }

  const handleLogout = () => {
    if (isAuthenticated) {
      logout()
      login({})
      console.log("Sesión cerrada con éxito")
    } else {
      console.log(
        "No se ha iniciado sesión, por lo tanto no se puede cerrar la sesión."
      )
    }
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <h1 className="profile-title">Mi Perfil</h1>
        <ul className="profile-links">
          {Object.keys(contentMap).map((link) => (
            <li key={link}>
              <Link
                to={`/${link.replace(" ", "-").toLowerCase()}`}
                className={`profile-link ${
                  selectedLink === link ? "active" : ""
                }`}
                onClick={() => handleLinkClick(link)}
              >
                {link}
              </Link>
            </li>
          ))}

          <button className="dark-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </ul>
      </div>
      <div className="profile-content">
        <div className="profile-content-title">{contentMap[selectedLink]}</div>
      </div>
    </div>
  )
}

export default Profile
