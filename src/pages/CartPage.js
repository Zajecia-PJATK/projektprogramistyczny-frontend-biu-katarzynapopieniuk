import Cart from "../components/Cart";
import {Link} from "react-router-dom";
import getMessage from "../common/LanguageVersionMessageFinder";
import React from "react";

export default function CartPage({cart=[], setCart = f => f, products = [], languageVersion, addOrder, loggedUserEmail}) {
    return <div className="p-4 sm:ml-64">
        <Cart cart={cart} setCart={setCart} products={products} languageVersion={languageVersion}/>
        {getCheckoutOrLoginButton(languageVersion, addOrder, loggedUserEmail, cart.length === 0)}
    </div>
}

function getCheckoutOrLoginButton(languageVersion, addOrder, loggedUserEmail, isCartEmpty) {
    if(isCartEmpty) {
        return <div>{getMessage(languageVersion, "emptyCart", LABELS)}</div>
    }
    if(loggedUserEmail === "") {
        return <Link to="/login" className="px-6 font-semibold rounded-full bg-violet-600 text-white">
            {getMessage(languageVersion, "login", LABELS)}
        </Link>
    }

    return <Link to="/checkout" className="px-6 font-semibold rounded-full bg-violet-600 text-white">{getMessage(languageVersion, "checkout", LABELS)}</Link>
}

const LABELS = [
    {
        "name" : "login",
        "values": [
            {
                "language" : "english",
                "value": "Log in to checkout"
            },
            {
                "language" : "polish",
                "value": "Zaloguj się, aby złożyć zamówienie"
            }
        ]
    },
    {
        "name" : "checkout",
        "values": [
            {
                "language" : "english",
                "value": "Checkout"
            },
            {
                "language" : "polish",
                "value": "Złóż zamówienie"
            }
        ]
    },
    {
        "name" : "emptyCart",
        "values": [
            {
                "language" : "english",
                "value": "Cart is empty!"
            },
            {
                "language" : "polish",
                "value": "Koszyk jest pusty!"
            }
        ]
    }
]