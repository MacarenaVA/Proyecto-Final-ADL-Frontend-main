import React, { useState, useEffect, useContext } from "react"
import { MyContext } from "../Context/MyContext"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import "../App.css"

function MyPosts() {
  const { user, logout } = useContext(MyContext)
  const [userPosts, setUserPosts] = useState([])
  const [user_id, setUser_id] = useState(null)

  useEffect(() => {
    if (user) {
      setUser_id(user.id)
    }
  }, [user])

  const fetchUserPosts = async () => {
    if (!user_id) {
      return
    }

    try {
      const response = await axios.get(
        `https://proyecto-final-adl-frontend-main.onrender.com/user-posts/${user_id}`
      )

      if (response.status === 200) {
        setUserPosts(response.data)
      } else {
        console.error("Error al obtener las publicaciones del usuario.")
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error)
    }
  }

  useEffect(() => {
    fetchUserPosts()
  }, [user_id])

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
            <Link to="/profile" className="profile-link">
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link to="/modificar-perfil" className="profile-link">
              Modificar Perfil
            </Link>
          </li>
          <li>
            <Link to="/mis-favoritos" className="profile-link">
              Mis Favoritos
            </Link>
          </li>
          <li>
            <Link to="/crear-publicación" className="profile-link">
              Crear Publicación
            </Link>
          </li>
          <li>
            <Link to="/mis-publicaciones" className="profile-link active">
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
          <div className="profile-posts-list">
            {userPosts.map((post) => (
              <div key={post.id} className="profile-post-item">
                <Link to={`/${post.id}`} className="post-link">
                  <h2>{post.name}</h2>
                </Link>
                <p className="post-description">{post.description}</p>
                <p className="post-price">Precio: {post.price}</p>
                <div className="img-container">
                  <img src={post.img} alt={post.name} className="post-image" />
                </div>

                {console.log("Ruta de la imagen:", post.image)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyPosts
