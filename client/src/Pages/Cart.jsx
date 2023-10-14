import React, { useContext } from "react"
import MyContext from "../context/MyContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"

const Cart = () => {
  const chile = new Intl.NumberFormat("es-CL")
  const {
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
  } = useContext(MyContext)

  const updateProductQuantity = (product, increment) => {
    const updatedProducts = allProducts.map((item) =>
      item.id === product.id
        ? {
            ...item,
            qty: Math.max(item.qty + increment, 0),
          }
        : item
    )

    setCountProducts(countProducts + increment)
    setTotal(total + product.price * increment)
    setAllProducts(updatedProducts)
  }

  const onDeleteProduct = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id)

    setTotal(total - product.price * product.qty)
    setCountProducts(countProducts - product.qty)
    setAllProducts(results)
  }

  const onDeleteCart = () => {
    setAllProducts([])
    setCountProducts(0)
    setTotal(0)
  }

  return countProducts ? (
    <div className="cart-container">
      <div className="cart">
        <div className="cart-l">
          {allProducts.map((product) => (
            <div className="cart-card" key={product.id}>
              <div className="card-l">
                <div className="img-cart">
                  <img src={product.img} alt={product.name} />
                </div>
                <div className="title-total">
                  <h2>{product.name}</h2>
                  <p>${chile.format(product.price)}</p>
                </div>
              </div>
              <div className="card-r">
                <FontAwesomeIcon
                  icon={faMinus}
                  className="fa-minus"
                  onClick={() => updateProductQuantity(product, -1)}
                >
                  -
                </FontAwesomeIcon>
                <p className="each-qty">{product.qty}</p>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="fa-plus"
                  onClick={() => updateProductQuantity(product, 1)}
                >
                  +
                </FontAwesomeIcon>
                <p className="subtotal">
                  ${chile.format(product.price * product.qty)}
                </p>
                <button
                  className="remove-button"
                  onClick={() => onDeleteProduct(product)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
          <button className="delete-cart" onClick={() => onDeleteCart()}>
            Vaciar Carrito
          </button>
        </div>
        <div className="cart-r">
          <h2>Resumen</h2>
          <div className="cant">
            <p>Cantidad:</p>
            <p className="cant-p">{countProducts} productos</p>
          </div>
          <div className="total">
            <p>Total:</p>
            <p className="total-p">${chile.format(total)}</p>
          </div>
          <button className="pay">Pagar</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="cart-container">
      <div className="empty">
        <p>Carrito vacío</p>
      </div>
    </div>
  )
}

export default Cart
