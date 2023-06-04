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
import accountsData from "./data/userAccounts.json";
import LoginPage from "./pages/LoginPage";
import SideBar from "./components/SideBar";
import CategoryPage from "./pages/CategoryPage";

function App() {
  const [products, setProducts] = useState(productsData);
  const [languageVersion, setLanguageVersion] = useState("polish");
  const [cart, setCart] = useState([]);
  const [accounts, setAccounts] = useState(accountsData);
  const [loggedUserEmail, setLoggedUserEmail] = useState("");

    function addProduct(productId) {
        var productsWithMatchingId = cart.filter(product => product.id === productId);
        var newCart;

        if(productsWithMatchingId.length > 0) {
            newCart = cart.map( product => product.id === productId ? updateProduct(product) : product);
        } else {
            newCart = [...cart, {id: productId, quantity: 1}];
        }

        setCart(newCart);
    }

  return (
    <div className="App">
        <nav className="navigation">
            <ul>
                <li><Link to="/">{getMessage(languageVersion, "home", PAGE_NAMES)}</Link></li>
                <li><Link to="/cart">{getMessage(languageVersion, "cart", PAGE_NAMES)}<FaShoppingCart size="30"/>{getProductsAmount(cart)}</Link></li>
                {getLinksDependingOnIfUserIsLogged(languageVersion, loggedUserEmail, setLoggedUserEmail)}
                <li><LanguageVersionPicker onPickedLanguage={(language) => {setLanguageVersion(language)}}/></li>
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<HomePage products={products} languageVersion={languageVersion}/>}/>
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} products={products} languageVersion={languageVersion}/>}/>
            <Route path="/products/:id" element={<ProductPage products={products} languageVersion={languageVersion} cart={cart} onAddProduct={(id) => addProduct(id)} onRate={(id, rating) => onRateProduct(id, rating, products, setProducts)}/>}/>
            <Route path="/signup" element={<SignUpPage languageVersion={languageVersion} accounts={accounts} setAccounts={setAccounts}/>}/>
            <Route path="/login" element={<LoginPage languageVersion={languageVersion} accounts={accounts} setLoggetUserEmail={setLoggedUserEmail}/>}/>
            <Route path="/category/:category" element={<CategoryPage products={products} languageVersion={languageVersion}/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
        <SideBar languageVersion={languageVersion}/>
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
                "value": "Strona główna"
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
    },
    {
        "name" : "login",
        "values": [
            {
                "language" : "english",
                "value": "Log in"
            },
            {
                "language" : "polish",
                "value": "Zaloguj się"
            }
        ]
    },
    {
        "name" : "logout",
        "values": [
            {
                "language" : "english",
                "value": "Log out"
            },
            {
                "language" : "polish",
                "value": "Wyloguj się"
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

function getLinksDependingOnIfUserIsLogged(languageVersion, loggedUserEmail, setLoggedUserEmail) {
    if(loggedUserEmail === "") {
        return <>
            <li><Link to="/signup">{getMessage(languageVersion, "signup", PAGE_NAMES)}</Link></li>
            <li><Link to="/login">{getMessage(languageVersion, "login", PAGE_NAMES)}</Link></li>
        </>
    }

    return <li>{getLogoutButton(getMessage(languageVersion, "logout", PAGE_NAMES), () => setLoggedUserEmail(""))}</li>
}
function getLogoutButton(name, onLogoutButton =  f => f) {
    return <button onClick={() => onLogoutButton()}
                   className="block text-white w-20 text-2xl m-2 cursor-pointer">
        {name}
    </button>
}

function onRateProduct(id, rating, products, setProducts) {
    const newProducts = products.map(product => product.id === id ? {...product, rating} : product)
        .map(product => product.id === id ? updatePhotoRatings(product, rating) : product);
    setProducts(newProducts)
}

function updatePhotoRatings(product, rating) {
    product.rating = rating;
    return product;
}
