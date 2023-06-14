import {useParams} from "react-router-dom";
import getMessage from "../common/LanguageVersionMessageFinder";
import React from "react";
import NotFoundPage from "./NotFoundPage";
import OrderSummary from "../components/orders/OrderSummary";

export default function OrderPage({languageVersion, orders, loggedUserEmail, products}) {
    const {id} = useParams();
    if (loggedUserEmail === "") {
        return <NotFoundPage/>
    }

    var userOrders = getOrderForUser(orders, loggedUserEmail, id);
    if (userOrders.length === 0) {
        return <div className="p-4 sm:ml-64">
            {getMessage(languageVersion, "empty", LABELS)}
        </div>
    }

    var order = userOrders[0];

    return <div className="p-4 sm:ml-64">
        <OrderSummary order={order} languageVersion={languageVersion} products={products}/>
        {getAddress(order, languageVersion)}
        {getPayment(order, languageVersion)}
    </div>
}

function getOrderForUser(orders, loggedUserEmail, id) {
    return orders.filter(order => order.userEmail === loggedUserEmail)
        .filter(order => order.id === id);
}

function getAddress(order, languageVersion) {
    return <div className="border-4 border-violet-400">
        <div>
            {getMessage(languageVersion, "address", LABELS)}
        </div>
        <div>
            {order.address.street}
        </div>
        <div>
            {order.address.city}
        </div>
        <div>
            {order.address.postCode}
        </div>
        <div>
            {order.address.country}
        </div>
    </div>
}

function getPayment(order, languageVersion) {
    return <div className="border-4 border-violet-400">
        {getMessage(languageVersion, "paymentMethod", LABELS)}
        {getMessage(languageVersion, order.paymentMethod, LABELS)}
    </div>
}


const LABELS = [
    {
        "name": "orders",
        "values": [
            {
                "language": "english",
                "value": "Orders"
            },
            {
                "language": "polish",
                "value": "Zamówienia"
            }
        ]
    },
    {
        "name": "empty",
        "values": [
            {
                "language": "english",
                "value": "There are no orders"
            },
            {
                "language": "polish",
                "value": "Brak złożonych zamówień"
            }
        ]
    },
    {
        "name": "address",
        "values": [
            {
                "language": "english",
                "value": "Arrival address"
            },
            {
                "language": "polish",
                "value": "Adres wysyłki"
            }
        ]
    },
    {
        "name": "paymentMethod",
        "values": [
            {
                "language": "english",
                "value": "Payment method: "
            },
            {
                "language": "polish",
                "value": "Metoda płatności: "
            }
        ]
    },
    {
        "name" : "transfer",
        "values": [
            {
                "language" : "english",
                "value": "Transfer"
            },
            {
                "language" : "polish",
                "value": "Przelew"
            }
        ]
    },
    {
        "name" : "card",
        "values": [
            {
                "language" : "english",
                "value": "Card"
            },
            {
                "language" : "polish",
                "value": "Karta"
            }
        ]
    }
]