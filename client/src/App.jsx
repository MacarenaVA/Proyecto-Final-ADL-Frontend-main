import React, { useContext } from "react"
import MyContext from "./Context/MyContext"
import PublicHeader from "./components/PublicHeader"
import PrivateHeader from "./components/PrivateHeader"
import PublicRoutes from "./router/PublicRoutes"
import PrivateRoutes from "./router/PrivateRoutes"
import Footer from "./components/Footer"

function App() {
  const { token } = useContext(MyContext)

  return (
    <div>
      <MyContext.Provider
        value={{
          token,
          allProducts,
          setAllProducts,
          cartProducts,
          updateCart,
          countProducts,
          total,
          setUser,
          login,
          logout,
        }}
      >
        {token ? <PrivateHeader /> : <PublicHeader />}
        {token ? <PrivateRoutes /> : <PublicRoutes />}
      </MyContext.Provider>
      <Footer />
    </div>
  )
}

export default App
