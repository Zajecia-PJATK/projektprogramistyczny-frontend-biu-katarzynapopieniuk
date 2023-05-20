import logo from './logo.svg';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import {FaShoppingCart} from "react-icons/fa";

function App() {
  return (
    <div className="App">
        <nav className="navigation">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cart">Cart <FaShoppingCart size="30"/></Link></li>
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/products/:id" element={<ProductPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
