import React, { useState, useEffect, useContext } from "react"
import { MyContext } from "../Context/MyContext"
import { Link, Navigate } from "react-router-dom"
import Axios from "axios" // Importa Axios

function Favorites() {
  const { user, logout } = useContext(MyContext)
  const [favorites, setFavorites] = useState([])
  const [newFavorite, setNewFavorite] = useState("")

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await Axios.get(
          "https://proyecto-final-adl-frontend-main.onrender.com/api/favorites",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              n,
            },
          }
        )

        if (response.status === 200) {
          setFavorites(response.data.favorites)
        } else {
          console.error("Error al obtener la lista de favoritos.")
        }
      } catch (error) {
        console.error("Error al obtener la lista de favoritos:", error)
      }
    }

    if (user) {
      fetchFavorites()
    }
  }, [user])

  const addFavorite = () => {
    if (newFavorite.trim() !== "") {
      setFavorites([...favorites, newFavorite])
      setNewFavorite("")
    }
  }

  const removeFavorite = (index) => {
    const updatedFavorites = [...favorites]
    updatedFavorites.splice(index, 1)
    setFavorites(updatedFavorites)
  }

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
        <h1 className="profile-content-title">Favoritos</h1>
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index}>{favorite}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Favorites
