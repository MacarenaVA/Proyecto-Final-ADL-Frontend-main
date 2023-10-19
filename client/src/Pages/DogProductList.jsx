import React, { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../Context/MyContext"
import axios from "axios"

const DogsProductList = () => {
  const [dogProducts, setDogProducts] = useState([])
  const { setCountProducts, setTotal, cartProducts, setCartProducts } =
    useContext(MyContext)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(
        "https://proyecto-final-adl-frontend-main.onrender.com/products/category/Perro"
      )
      .then((response) => {
        setDogProducts(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleClick = (product) => {
    navigate(`/${product.id}`)
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

      setCartProducts(updatedCartProducts)

      const newCountProducts = updatedCartProducts.reduce(
        (count, item) => count + item.qty,
        0
      )
      const newTotal = updatedCartProducts.reduce(
        (total, item) => total + item.price * item.qty,
        0
      )

      setCountProducts(newCountProducts)
      setTotal(newTotal)
    } else {
      product.qty = 1
      const updatedCartProducts = [...cartProducts, product]

      setCartProducts(updatedCartProducts)

      const newCountProducts = updatedCartProducts.reduce(
        (count, item) => count + item.qty,
        0
      )
      const newTotal = updatedCartProducts.reduce(
        (total, item) => total + item.price * item.qty,
        0
      )

      setCountProducts(newCountProducts)
      setTotal(newTotal)
    }

    console.log("Producto agregado al carrito:", product)
  }

  const chile = new Intl.NumberFormat("es-CL")

  return (
    <div className="product-list-container">
      <div className="product-list">
        {dogProducts.map((product) => (
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

export default DogsProductList
