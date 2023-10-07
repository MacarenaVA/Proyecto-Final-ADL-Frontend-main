import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../context/MyContext"

const DogsProductList = () => {
  const chile = new Intl.NumberFormat("es-CL")
  const {
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
    data,
  } = useContext(MyContext)

  // Filtrar los productos con la categoría "perro"
  const dogProducts = data.filter((product) => product.categoria === "Perro")

  const [selectedProduct, setSelectedProduct] = useState(null)

  const onAddProduct = (product) => {
    const existingProduct = allProducts.find((item) => item.id === product.id)

    if (existingProduct) {
      const updatedProducts = allProducts.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      )
      setTotal(total + product.price)
      setCountProducts(countProducts + 1)
      setAllProducts(updatedProducts)
    } else {
      product.qty = 1
      setTotal(total + product.price)
      setCountProducts(countProducts + 1)
      setAllProducts([...allProducts, product])
    }
  }

  const navigate = useNavigate()
  const handleClick = (product) => {
    navigate(`/${product.id}`)
  }

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
