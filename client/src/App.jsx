import React, { useEffect, useState } from "react"
import { MyContextProvider } from "./Context/MyContext"
import Header from "./components/Header"
import AppRouter from "./router/AppRouter"
import Footer from "./components/Footer"

function App() {
  return (
    <MyContextProvider>
      <Header />
      <AppRouter />
      <Footer />
    </MyContextProvider>
  )
}

export default App
