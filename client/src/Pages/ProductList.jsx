import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../Context/MyContext"
import axios from "axios"

const ProductList = () => {
  const chile = new Intl.NumberFormat("es-CL")
  const {
    allProducts,
    setAllProducts,
    cartProducts,
    setCartProducts,
    setCountProducts,
    setTotal,
  } = useContext(MyContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://proyecto-final-adl-frontend-main.onrender.com/products"
        )
        setAllProducts(response.data)
      } catch (error) {
        console.error("Error al cargar productos:", error)
      }
    }

    fetchData()
  }, [setAllProducts])

  const handleClick = (product) => {
    navigate(`${product.id}`)
  }

  const onAddProduct = (product) => {
    const productInCart = cartProducts.find((item) => item.id === product.id)

    if (productInCart) {
      const updatedProductInCart = {
        ...productInCart,
        qty: productInCart.qty + 1,
      }
      const updatedCartProducts = cartProducts.map((item) =>
        item.id === product.id ? updatedProductInCart : item
      )

      updateCart(updatedCartProducts)
    } else {
      product.qty = 1
      const updatedCartProducts = [...cartProducts, product]

      updateCart(updatedCartProducts)
    }

    console.log("Producto agregado al carrito:", product)
  }

  return (
    <div className="product-list-container">
      <div className="product-list">
        {Array.isArray(allProducts) &&
          allProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <div className="img-container">
                <img src={product.img} alt={product.name} />
              </div>
              <h2 onClick={() => handleClick(product)}>
                {product.name
                  ? product.name.charAt(0).toUpperCase() + product.name.slice(1)
                  : "No Name"}
              </h2>
              <p>{product.description}</p>
              <button onClick={() => onAddProduct(product)}>
                Agregar al Carrito - {chile.format(product.price)}
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ProductList
