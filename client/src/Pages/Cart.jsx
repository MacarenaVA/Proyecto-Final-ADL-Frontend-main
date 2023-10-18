import React, { useContext } from "react"
import { MyContext } from "../context/MyContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"

const Cart = () => {
  const { cartProducts, updateCart, countProducts, total } =
    useContext(MyContext)

  const updateProductQuantity = (product, increment) => {
    console.log("Incremento:", increment)
    const updatedProducts = cartProducts.map((item) => {
      if (item.id === product.id) {
        const newQty = Math.max(item.qty + increment, 0)
        console.log("Nueva cantidad:", newQty)
        return { ...item, qty: newQty }
      }
      return item
    })

    console.log("Productos actualizados:", updatedProducts)
    updateCart(updatedProducts)
  }

  const onDeleteProduct = (product) => {
    const updatedProducts = cartProducts.filter(
      (item) => item.id !== product.id
    )

    updateCart(updatedProducts)
  }

  const onDeleteCart = () => {
    updateCart([])
  }

  const chile = new Intl.NumberFormat("es-CL")

  return (
    <div className="cart-container">
      <div className="cart">
        <div className="cart-l">
          {cartProducts.length > 0 ? (
            cartProducts.map((product) => (
              <div className="cart-card" key={product.id}>
                <div className="card-l">
                  <div className="img-cart">
                    <img src={product.img} alt={product.name} />
                  </div>
                  <div className="title-total">
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                  </div>
                </div>
                <div className="card-r">
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="fa-minus"
                    onClick={() => updateProductQuantity(product, -1)}
                  />
                  <p className="each-qty">{product.qty}</p>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="fa-plus"
                    onClick={() => updateProductQuantity(product, 1)}
                  />
                  {console.log("Precio del producto:", product.price)}
                  {console.log("Cantidad del producto:", product.qty)}
                  <p className="subtotal"> $ {product.price * product.qty}</p>
                  <button
                    className="remove-button"
                    onClick={() => onDeleteProduct(product)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart">
              <p>El carrito está vacío.</p>
            </div>
          )}
          {cartProducts.length > 0 && (
            <button className="delete-cart" onClick={onDeleteCart}>
              Vaciar Carrito
            </button>
          )}
        </div>
        <div className="cart-r">
          {cartProducts.length > 0 && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
