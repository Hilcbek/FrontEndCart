import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Header } from "./Components/Header"
import { Products } from "./pages/Products"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { SingleProductPage } from "./pages/SingleProductPage"
import { AddProduct } from "./pages/AddProduct"
import { useSelector } from "react-redux"
import { CartSide } from "./pages/CartSide"
import { About } from "./pages/About"
function App() {
  let {name} = useSelector( (state) => state.user )
  return (
   <div className="font-Kreon">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={name ? <Home /> : <Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={name ? <Home /> : <Register />} />
          <Route path="/login" element={name ? <Home /> : <Login />} />
          <Route path="/product/:id" element={name ? <SingleProductPage /> : <Login />} />
          <Route path="/addProduct" element={name ? <AddProduct/> : <Login />} />
        </Routes>
      </BrowserRouter>
   </div>
  )
}

export default App
