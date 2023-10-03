import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { PetStoreContext } from "../Context/PetStoreContext"
import { CartContext } from "../Context/CartContext"

const Cats = () => {
  const chile = new Intl.NumberFormat("es-CL")
  const { products, setProducts, countProducts, setCountProducts } =
    useContext(PetStoreContext)

  const { total, setTotal } = useContext(CartContext)

  const catProductsList = products.filter(
    (product) => product.categoria === "gatos"
  )

  const onAddProduct = (product) => {
    const productExists = products.find((item) => item.id === product.id)
    const updatedProducts = productExists
      ? products.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      : [...products, { ...product, qty: 1 }]

    setTotal(total + product.price)
    setCountProducts(countProducts + 1)
    setProducts(updatedProducts)
  }

  const navigate = useNavigate()
  const handleClick = (product) => {
    navigate(`/${product.id}`)
  }

  return (
    <div className="product-list-container">
      <div className="product-list">
        {catProductsList.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="img-container" onClick={() => handleClick(product)}>
              <img src={product.img} alt={product.name} />
            </div>
            <h2 onClick={() => handleClick(product)}>
              {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
            </h2>
            <p>{product.description}</p>
            <button onClick={() => onAddProduct(product)}>
              Agregar ${chile.format(product.price)}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cats
