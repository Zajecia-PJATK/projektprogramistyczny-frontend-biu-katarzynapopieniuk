import getProductBySimpleProduct from "../../common/ProductRetriever";
import OrderProduct from "./OrderProduct";
import getMessage from "../../common/LanguageVersionMessageFinder";
import getOrderStatus from "../../common/OrderStatusRetriever";
import React from "react";

export default function getOrderProducts(order, products, languageVersion) {
    return order.products.map(simpleProduct => getOrderProduct(simpleProduct, products, languageVersion))
        .filter(simpleProduct => simpleProduct != null);
}

function getOrderProduct(simpleProduct, products, languageVersion) {
    var product = getProductBySimpleProduct(simpleProduct, products);
    if (product == null) {
        return null;
    }
    return <OrderProduct product={product} quantity={simpleProduct.quantity} languageVersion={languageVersion}/>
}

export function getAddress(order, languageVersion) {
    return <div className="border-2 border-violet-400">
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

export function getStatus(order, languageVersion, possibleOrderStatuses) {
    return <div className="border-2 border-violet-400">
        <div>
            {getMessage(languageVersion, "paymentMethod", LABELS)}
            {getMessage(languageVersion, order.paymentMethod, LABELS)}
        </div>
        <div>
            {getMessage(languageVersion, "orderStatus", LABELS)}
            {getOrderStatus(order, languageVersion, possibleOrderStatuses)}
        </div>
    </div>
}

export function getOrderTotal(total, languageVersion) {
    return <div className="min-w-0 relative flex-auto text-violet-600 font-bold">
        {getMessage(languageVersion, "total", LABELS)}
        {total}zł
    </div>
}

export function getOrderDiscount(order, languageVersion) {
    return <div hidden={order.discountValue === null || order.discountValue === undefined || order.discountValue === 0}
                className="p-4">
        {`${getMessage(languageVersion, "discountValue", LABELS)} ${order.discountValue} %`}
    </div>
}

const LABELS = [
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
        "name": "transfer",
        "values": [
            {
                "language": "english",
                "value": "Transfer"
            },
            {
                "language": "polish",
                "value": "Przelew"
            }
        ]
    },
    {
        "name": "card",
        "values": [
            {
                "language": "english",
                "value": "Card"
            },
            {
                "language": "polish",
                "value": "Karta"
            }
        ]
    },
    {
        "name": "orderStatus",
        "values": [
            {
                "language": "english",
                "value": "Order status: "
            },
            {
                "language": "polish",
                "value": "Status zamówienia: "
            }
        ]
    },
    {
        "name": "total",
        "values": [
            {
                "language": "english",
                "value": "total: "
            },
            {
                "language": "polish",
                "value": "suma: "
            }
        ]
    },
    {
        "name" : "discountValue",
        "values": [
            {
                "language" : "english",
                "value": "Discount value: "
            },
            {
                "language" : "polish",
                "value": "Wysokość zniżki: "
            }
        ]
    }
]