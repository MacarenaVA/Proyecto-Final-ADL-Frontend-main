import Header from "./components/Header"
import AppRouter from "./router/AppRouter"
import { useEffect, useState } from "react"
import { MyContext } from "./context/MyContext"
import { AuthProvider } from "./context/AuthContext"

import "./App.css"
import Footer from "./components/Footer"

function App() {
  const [data, setData] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [countProducts, setCountProducts] = useState(0)

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("../src/data/data.json")
        const jsonData = await res.json()
        setData(jsonData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    getData()
  }, [])

  return (
    <AuthProvider>
      <MyContext.Provider
        value={{
          data,
          setData,
          allProducts,
          setAllProducts,
          total,
          setTotal,
          countProducts,
          setCountProducts,
        }}
      >
        <Header />
        <AppRouter />
        <Footer />
      </MyContext.Provider>
    </AuthProvider>
  )
}

export default App
