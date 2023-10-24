import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { MyContext } from "../Context/MyContext"

const DetailProduct = () => {
  const {
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    setTotal,
    cartProducts,
    setCartProducts,
  } = useContext(MyContext)

  const { id } = useParams()
  const product = allProducts.find((product) => product.id === parseInt(id))
  console.log("Productos:", allProducts)

  if (!product) {
    return <div>Producto no encontrado.</div>
  }

  const chile = new Intl.NumberFormat("es-CL")
  const productName =
    product.name.charAt(0).toUpperCase() + product.name.slice(1)

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

  return (
    <div className="detail-container">
      <div className="detail">
        <div className="detail-l">
          <h2>{productName}</h2>
          <p>
            <span>Descripción: </span>
            {product.description}
          </p>
          <p>{product.desc}</p>
          <div className="buy">
            <h3>Precio: ${chile.format(product.price)}</h3>
          </div>
          <div className="buy">
            <button
              onClick={() => onAddProduct(product)}
              className="add-detail"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
        <div className="detail-r">
          <div className="detail-img">
            <img src={product.img} alt={productName} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
