import React from "react"
import { MyContextProvider } from "./Context/MyContext"
import Header from "./components/Header"
import AppRouter from "./router/AppRouter"
import Footer from "./components/Footer"

function App() {
  return (
    <MyContextProvider>
      <div>
        <Header />
        <AppRouter />
        <Footer />
      </div>
    </MyContextProvider>
  )
}

export default App
