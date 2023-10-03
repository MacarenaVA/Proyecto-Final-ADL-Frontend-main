import React, { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import ModifyProfile from "../pages/ModifyProfile"
import Favorites from "../pages/Favorites"
import "../App.css"
import CreateProductPost from "./CreateProductPost"
import MyPosts from "./MyPost"

function Profile() {
  const { user, logout } = useAuth()
  const [selectedLink, setSelectedLink] = useState("Mi Perfil")
  const contentMap = {
    "Mi Perfil": `Bienvenido, ${user.username}.`,
    "Modificar Perfil": <ModifyProfile />,
    "Mis Favoritos": <Favorites />,
    "Crear Publicación": <CreateProductPost />,
    "Mis Publicaciones": <MyPosts />,
  }

  const handleLinkClick = (link) => {
    setSelectedLink(link)
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

          <button className="dark-button" onClick={logout}>
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
