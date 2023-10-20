import React, { useState, useEffect, useContext } from "react"
import { MyContext } from "../Context/MyContext"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import "../App.css"

function CreateProductPost() {
  const { user, logout } = useContext(MyContext)
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoria: "",
    img: "",
    user_id: user.id,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleProductChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async (e) => {
    console.log(user.id)
    e.preventDefault()
    setIsSubmitting(true)
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.stock ||
      !product.categoria ||
      !product.img
    ) {
      console.error("Por favor, complete todos los campos.")
      setIsSubmitting(false)
      return
    }
    console.log("Valores de product:", product)

    try {
      const formData = new FormData()
      formData.append("name", product.name)
      formData.append("description", product.description)
      formData.append("price", product.price)
      formData.append("stock", product.stock)
      formData.append("categoria", product.categoria)
      formData.append("img", product.img)
      formData.append("user_id", product.user_id)

      const urlServer = "https://proyecto-final-adl-frontend-main.onrender.com"
      const endpoint = "/products"
      const response = await axios.post(urlServer + endpoint, formData)

      console.log("URL de la solicitud:", urlServer + endpoint)

      if (response.status === 200) {
        console.log("La publicación se creó con éxito.")
      } else {
        console.error("Error al crear la publicación.")
      }
    } catch (error) {
      console.log("Error al enviar la solicitud: " + error.message)
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
        <h1 className="profile-name">
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
        <h1 className="profile-content-name">Crear Publicación de Producto</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Título:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleProductChange}
              required
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleProductChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoria">Categoria (Perro o gato):</label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              value={product.categoria}
              onChange={handleProductChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="img">Imagen:</label>
            <input
              type="text"
              id="img"
              name="img"
              value={product.img}
              onChange={handleProductChange}
              required
              autoComplete="off"
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
