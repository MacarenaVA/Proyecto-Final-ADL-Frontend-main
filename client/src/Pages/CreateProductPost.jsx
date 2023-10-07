import React, { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, Navigate } from "react-router-dom"
import "../App.css"

function CreateProductPost() {
  const { user, logout } = useAuth()
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
  })

  const [image, setImage] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleProductChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("title", product.title)
      formData.append("description", product.description)
      formData.append("price", product.price)
      formData.append("image", image)

      const response = await fetch("URL_DE_TU_API_PARA_CREAR_PUBLICACIONES", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        console.log("La publicación se creó con éxito.")
      } else {
        console.error("Error al crear la publicación.")
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error)
    } finally {
      setIsSubmitting(false)
    }
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
              Favoritos
            </Link>
          </li>
          <li>
            <Link to="/crear-publicación" className="profile-link active">
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
        <h1 className="profile-content-title">Crear Publicación de Producto</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={handleProductChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleProductChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleProductChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Imagen:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit" className="dark-button" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Crear Publicación"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProductPost
