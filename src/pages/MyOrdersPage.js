import getMessage from "../common/LanguageVersionMessageFinder";
import React from "react";
import NotFoundPage from "./NotFoundPage";
import OrderSummary from "../components/orders/OrderSummary";

export default function MyOrdersPage({languageVersion, orders, loggedUserEmail, products}) {
    if(loggedUserEmail === "") {
        return <NotFoundPage/>
    }

    var userOrders = getOrdersForUser(orders, loggedUserEmail);
    if(userOrders.length === 0) {
        return <div className="p-4 sm:ml-64">
            {getMessage(languageVersion, "empty", LABELS)}
        </div>
    }

    return <div className="p-4 sm:ml-64">
        {orders.map(order => <OrderSummary order={order} products={products} languageVersion={languageVersion}/>)}
    </div>
}

function getOrdersForUser(orders, loggedUserEmail) {
    return orders.filter(order => order.userEmail === loggedUserEmail);
}


const LABELS = [
    {
        "name" : "orders",
        "values": [
            {
                "language" : "english",
                "value": "Orders"
            },
            {
                "language" : "polish",
                "value": "Zamówienia"
            }
        ]
    },
    {
        "name" : "empty",
        "values": [
            {
                "language" : "english",
                "value": "There are no orders"
            },
            {
                "language" : "polish",
                "value": "Brak złożonych zamówień"
            }
        ]
    }
]