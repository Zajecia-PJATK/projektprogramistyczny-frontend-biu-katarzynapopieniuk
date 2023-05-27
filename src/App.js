import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import React, {useState} from "react";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import {FaShoppingCart} from "react-icons/fa";
import SignUpPage from "./pages/SignUpPage";
import productsData from "./data/products.json";
import getMessage from "./common/LanguageVersionMessageFinder";
import LanguageVersionPicker from "./components/LanguageVersionPicker";

function App() {
  const [products, setProducts] = useState(productsData);
  const [languageVersion, setLanguageVersion] = useState("polish");
  const [cart, setCart] = useState([]);

    function addProduct(productId, option) {
        var productsWithMatchingId = cart.filter(product => product.id === productId);
        var newCart;

        if(productsWithMatchingId.length > 0) {
            newCart = cart.map( product => product.id === productId ? updateProduct(product) : product);
        } else {
            newCart = [...cart, {id: productId, quantity: 1, option:option}];
        }

        setCart(newCart);
    }

  return (
    <div className="App">
        <nav className="navigation">
            <ul>
                <li><Link to="/">{getMessage(languageVersion, "home", PAGE_NAMES)}</Link></li>
                <li><Link to="/cart">{getMessage(languageVersion, "cart", PAGE_NAMES)}<FaShoppingCart size="30"/>{getProductsAmount(cart)}</Link></li>
                <li><Link to="/signup">{getMessage(languageVersion, "signup", PAGE_NAMES)}</Link></li>
                <li><LanguageVersionPicker onPickedLanguage={(language) => {setLanguageVersion(language)}}/></li>
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} products={products}/>}/>
            <Route path="/products/:id" element={<ProductPage products={products} languageVersion={languageVersion} cart={cart} onAddProduct={(id, option) => addProduct(id, option)}/>}/>
            <Route path="/signup" element={<SignUpPage languageVersion={languageVersion}/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    </div>
  );
}

export default App;

const PAGE_NAMES = [
    {
        "name" : "home",
        "values": [
            {
                "language" : "english",
                "value": "Home"
            },
            {
                "language" : "polish",
                "value": "Strona glówna"
            }
        ]
    },
    {
        "name" : "cart",
        "values": [
            {
                "language" : "english",
                "value": "Cart"
            },
            {
                "language" : "polish",
                "value": "Koszyk"
            }
        ]
    },
    {
        "name" : "signup",
        "values": [
            {
                "language" : "english",
                "value": "Sign Up"
            },
            {
                "language" : "polish",
                "value": "Zarejestruj się"
            }
        ]
    }
]


function updateProduct(product) {
    product.quantity = product.quantity + 1;
    return product;
}

function getProductsAmount(cart) {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0);
}