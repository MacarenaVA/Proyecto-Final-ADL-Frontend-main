import React, { useState, useEffect } from "react"
import { MyContext } from "../context/MyContext"
import { Link, Navigate } from "react-router-dom"
import "../App.css"

function MyPosts() {
  const { user, logout } = MyContext()
  const [userPosts, setUserPosts] = useState([])

  const fetchUserPosts = () => {
    const dummyUserPosts = []
    setUserPosts(dummyUserPosts)
  }

  useEffect(() => {
    fetchUserPosts()
  }, [])

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <h1 className="profile-title">
          <Link to="/profile" className="profile-link">
            Mi Perfil
          </Link>
        </h1>
        <ul className="profile-links">
          <li>
            <Link to="/mi-perfil" className="profile-link">
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link to="/modificar-perfil" className="profile-link">
              Modificar Perfil
            </Link>
          </li>
          <li>
            <Link to="/mis-favoritos" className="profile-link active">
              Mis Favoritos
            </Link>
          </li>
          <li>
            <Link to="/crear-publicación" className="profile-link">
              Crear Publicación
            </Link>
          </li>
          <li>
            <Link to="/mis-publicaciones" className="profile-link">
              Mis Publicaciones
            </Link>
          </li>
        </ul>
        <button onClick={logout} className="dark-button">
          Cerrar Sesión
        </button>
      </div>

      <div className="profile-content">
        <h1 className="profile-content-title">Mis Publicaciones</h1>
        {userPosts.length === 0 ? (
          <p>No tienes publicaciones aún.</p>
        ) : (
          <ul>
            {userPosts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default MyPosts
