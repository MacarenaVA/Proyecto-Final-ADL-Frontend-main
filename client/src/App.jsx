import React from "react"
import { MyContextProvider } from "./Context/MyContext"
import PublicHeader from "./components/PublicHeader"
import PrivateHeader from "./components/PrivateHeader"
import PublicRoutes from "./router/PublicRoutes"
import PrivateRoutes from "./router/PrivateRoutes"
import Footer from "./components/Footer"

function App() {
  const { MyContext } = useContext(MyContext)

  return (
    <div>
      <MyContextProvider>
        {token ? <PrivateHeader /> : <PublicHeader />}
        {token ? <PrivateRoutes /> : <PublicRoutes />}
      </MyContextProvider>
      <Footer />
    </div>
  )
}

export default App
