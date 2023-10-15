import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MyContext from "../context/MyContext"
import axios from "axios"

const ProductList = () => {
  const chile = new Intl.NumberFormat("es-CL")
  const { allProducts, setAllProducts, setCountProducts, setTotal } =
    useContext(MyContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((response) => {
      setProducts(response.data)
    })
  }, [])

  const onAddProduct = (product) => {
    const existingProduct = allProducts.find((item) => item.id === product.id)

    if (existingProduct) {
      const updatedProducts = allProducts.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      )
      updateCart(updatedProducts)
    } else {
      product.qty = 1
      const updatedProducts = [...allProducts, product]
      updateCart(updatedProducts)
    }
  }

  const navigate = useNavigate()
  const handleClick = (product) => {
    navigate(`/${product.id}`)
  }

  return (
    <div className="product-list-container">
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" id={product.id} key={product.id}>
            <div className="img-container" onClick={() => handleClick(product)}>
              <img src={product.img} alt={product.name} />
            </div>
            <h2 onClick={() => handleClick(product)}>
              {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
            </h2>
            <p>{product.description}</p>
            <button onClick={() => onAddProduct(product)}>
              Agregar al Carrito - ${chile.format(product.price)}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
