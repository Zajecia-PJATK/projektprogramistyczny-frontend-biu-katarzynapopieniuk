import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import React, {useMemo, useState} from "react";
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
import getUserByEmail from "./common/UserDataRetriever";
import ordersData from "./data/orders.json";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import OrderPage from "./pages/OrderPage";
import AdminPanelPage from "./pages/AdminPanelPage";

function App() {
    const [products, setProducts] = useState(productsData);
    const [languageVersion, setLanguageVersion] = useState("polish");
    const [cart, setCart] = useState([]);
    const [accounts, setAccounts] = useState(accountsData);
    const [loggedUserEmail, setLoggedUserEmail] = useState("");
    const [searchParams, setSearchParams] = useState({
        category: "",
        params: [],
        colors: [],
        price: {min: null, max: null}
    });
    const [orders, setOrders] = useState(ordersData);

    const [isLoggedUserAdmin, setIsLoggedUserAdmin] = useState(false);
    useMemo(() => {
        setIsLoggedUserAdmin(
            isUserIsAdmin(loggedUserEmail, accounts)
        );
    }, [loggedUserEmail]);

    function addProduct(productId) {
        var productsWithMatchingId = cart.filter(product => product.id === productId);
        var newCart;

        if (productsWithMatchingId.length > 0) {
            newCart = cart.map(product => product.id === productId ? updateProduct(product) : product);
        } else {
            newCart = [...cart, {id: productId, quantity: 1}];
        }

        setCart(newCart);
    }

    function addOrder(order) {
        setOrders([...orders, order]);
    }

    return (
        <div className="App">
            <nav className="navigation">
                <ul>
                    <li><Link to="/">{getMessage(languageVersion, "home", PAGE_NAMES)}</Link></li>
                    <li><Link to="/myorders"
                              hidden={loggedUserEmail === "" || isLoggedUserAdmin}>{getMessage(languageVersion, "orders", PAGE_NAMES)}</Link>
                    </li>
                    <li><Link to="/cart" hidden={isLoggedUserAdmin}>{getMessage(languageVersion, "cart", PAGE_NAMES)}<FaShoppingCart
                        size="30"/>{getProductsAmount(cart)}</Link></li>
                    <li><Link to="/adminpanel" hidden={!isLoggedUserAdmin}>{getMessage(languageVersion, "adminPanel", PAGE_NAMES)}</Link></li>
                    {getLinksDependingOnIfUserIsLogged(languageVersion, loggedUserEmail, setLoggedUserEmail)}
                    <li><LanguageVersionPicker onPickedLanguage={(language) => {
                        setLanguageVersion(language)
                    }}/></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage products={products} languageVersion={languageVersion}
                                                   searchParams={searchParams} setSearchParams={setSearchParams}/>}/>
                <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} products={products}
                                                       languageVersion={languageVersion} addOrder={addOrder}
                                                       loggedUserEmail={loggedUserEmail}/>}/>
                <Route path="/products/:id"
                       element={<ProductPage products={products} languageVersion={languageVersion} cart={cart}
                                             onAddProduct={(id) => addProduct(id)}
                                             onRate={(id, rating) => onRateProduct(id, rating, products, setProducts)}
                                             user={getUserByEmail(loggedUserEmail, accounts)}/>}/>
                <Route path="/signup" element={<SignUpPage languageVersion={languageVersion} accounts={accounts}
                                                           setAccounts={setAccounts}/>}/>
                <Route path="/login" element={<LoginPage languageVersion={languageVersion} accounts={accounts}
                                                         setLoggetUserEmail={setLoggedUserEmail} loggedUserEmail={loggedUserEmail}/>}/>
                <Route path="/checkout"
                       element={<CheckoutPage cart={cart} products={products} languageVersion={languageVersion}
                                              addOrder={addOrder} loggedUserEmail={loggedUserEmail}
                                              setCart={setCart}/>}/>
                <Route path="/myorders" element={<MyOrdersPage languageVersion={languageVersion} orders={orders}
                                                               loggedUserEmail={loggedUserEmail}
                                                               products={products}/>}/>
                <Route path="/myorders/:id" element={<OrderPage languageVersion={languageVersion} orders={orders}
                                                                loggedUserEmail={loggedUserEmail}
                                                                products={products}/>}/>
                <Route path="/adminpanel" element={<AdminPanelPage languageVersion={languageVersion} isLoggedUserAdmin={isLoggedUserAdmin} orders={orders} setOrders={setOrders} products={products} setProducts={setProducts}/> }/>
                <Route path="*" element={<NotFoundPage languageVersion={languageVersion}/>}/>
            </Routes>
            <SideBar languageVersion={languageVersion} searchParams={searchParams} setSearchParams={setSearchParams}/>
        </div>
    );
}

export default App;

const PAGE_NAMES = [
    {
        "name": "home",
        "values": [
            {
                "language": "english",
                "value": "Home"
            },
            {
                "language": "polish",
                "value": "Strona główna"
            }
        ]
    },
    {
        "name": "cart",
        "values": [
            {
                "language": "english",
                "value": "Cart"
            },
            {
                "language": "polish",
                "value": "Koszyk"
            }
        ]
    },
    {
        "name": "signup",
        "values": [
            {
                "language": "english",
                "value": "Sign Up"
            },
            {
                "language": "polish",
                "value": "Zarejestruj się"
            }
        ]
    },
    {
        "name": "login",
        "values": [
            {
                "language": "english",
                "value": "Log in"
            },
            {
                "language": "polish",
                "value": "Zaloguj się"
            }
        ]
    },
    {
        "name": "logout",
        "values": [
            {
                "language": "english",
                "value": "Log out"
            },
            {
                "language": "polish",
                "value": "Wyloguj się"
            }
        ]
    },
    {
        "name": "orders",
        "values": [
            {
                "language": "english",
                "value": "My orders"
            },
            {
                "language": "polish",
                "value": "Moje zamówienia"
            }
        ]
    },
    {
        "name": "adminPanel",
        "values": [
            {
                "language": "english",
                "value": "Admin panel"
            },
            {
                "language": "polish",
                "value": "Panel administratora"
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
    if (loggedUserEmail === "") {
        return <>
            <li><Link to="/signup">{getMessage(languageVersion, "signup", PAGE_NAMES)}</Link></li>
            <li><Link to="/login">{getMessage(languageVersion, "login", PAGE_NAMES)}</Link></li>
        </>
    }

    return <li>{getLogoutButton(getMessage(languageVersion, "logout", PAGE_NAMES), () => setLoggedUserEmail(""))}</li>
}

function getLogoutButton(name, onLogoutButton = f => f) {
    return <button onClick={() => onLogoutButton()}
                   className="block text-white w-20 text-2xl m-2 cursor-pointer">
        {name}
    </button>
}

function onRateProduct(id, rating, products, setProducts) {
    const newProducts = products.map(product => product.id === id ? {...product, rating} : product)
        .map(product => product.id === id ? updateProductRatings(product, rating) : product);
    setProducts(newProducts)
}

function updateProductRatings(product, rating) {
    product.rating = rating;
    return product;
}

function isUserIsAdmin(loggedUserEmail, accounts) {
    var user = getUserByEmail(loggedUserEmail, accounts);
    if (user === null) {
        return false;
    }

    return user.isAdmin;
}