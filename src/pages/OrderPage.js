import {Link, useParams} from "react-router-dom";
import getMessage from "../common/LanguageVersionMessageFinder";
import React, {useState} from "react";
import NotFoundPage from "./NotFoundPage";
import OrderSummary from "../components/orders/OrderSummary";
import getProductBySimpleProduct from "../common/ProductRetriever";
import possibleOrderProblemsData from "../config/possibleOrderProblems.json";

export default function OrderPage({languageVersion, orders, loggedUserEmail, products}) {
    const {id} = useParams();
    const [isReturnOrderSelected, setReturnOrderSelection] = useState(false);
    const [isOrderProblemsSelected, setOrderProblemsSelection] = useState(false);
    const [selectedProductsIdsForReturn, setProductsIdsForReturn] = useState([]);
    const [possibleOrderProblems, setPossibleOrderProblems] = useState(possibleOrderProblemsData);
    const [selectedOrderProblems, setSelectedOrderProblems] = useState([]);

    function onReturnOrderSelectionChange(event) {
        setReturnOrderSelection(!isReturnOrderSelected);
    }

    function onOrderProblemsSelectionChange(event) {
        setOrderProblemsSelection(!isOrderProblemsSelected);
    }

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
        <button id="bordered-radio-2" type="button" value="card" name="bordered-radio"
               className="w-full h-10 border-2 border-violet-400 bg-violet-50"
               onClick={onReturnOrderSelectionChange}>
            {getMessage(languageVersion, "returnOrder", LABELS)}
        </button>
        {getReturnOrderForm(order, languageVersion, isReturnOrderSelected, selectedProductsIdsForReturn, setProductsIdsForReturn, products)}
        <button id="bordered-radio-2" type="button" value="card" name="bordered-radio"
                className="w-full h-10 border-2 border-violet-400 bg-violet-50"
                onClick={onOrderProblemsSelectionChange}>
            {getMessage(languageVersion, "problemWithOrder", LABELS)}
        </button>
        {getComplaintForm(order, languageVersion, isOrderProblemsSelected, possibleOrderProblems, selectedOrderProblems, setSelectedOrderProblems)}
    </div>
}

function getOrderForUser(orders, loggedUserEmail, id) {
    return orders.filter(order => order.userEmail === loggedUserEmail)
        .filter(order => order.id === id);
}

function getAddress(order, languageVersion) {
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

function getPayment(order, languageVersion) {
    return <div className="border-2 border-violet-400">
        {getMessage(languageVersion, "paymentMethod", LABELS)}
        {getMessage(languageVersion, order.paymentMethod, LABELS)}
    </div>
}

function getReturnOrderForm(order, languageVersion, isReturnOrderSelected, selectedProductsIdsForReturn, setProductsIdsForReturn, products) {
    return <div className="border-t border-gray-200 px-4 py-6" hidden={!isReturnOrderSelected}>
        <h3 className="-mx-2 -my-3 flex w-full items-center px-2 py-3 text-gray-900 font-medium">
            {getMessage(languageVersion, "markProductsToReturn", LABELS)}
        </h3>
        <div className="pt-6" id="filter-section-mobile-0">
            <div className="space-y-6">
                {order.products.map(product => getReturnProductCheckbox(product, languageVersion, selectedProductsIdsForReturn, setProductsIdsForReturn, products))}
            </div>
        </div>

        <Link to="/">
            <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white"
                    type="button">
                {getMessage(languageVersion, "returnOrder", LABELS)}
            </button>
        </Link>
    </div>
}

function getReturnProductCheckbox(product, languageVersion, selectedProductsIdsForReturn, setProductsIdsForReturn, products) {
    function handleProductSelectionChange(event) {
        var newProductsIds;
        if (selectedProductsIdsForReturn.filter(productId => productId === event.target.value).length > 0) {
            newProductsIds = selectedProductsIdsForReturn.filter(color => color !== event.target.value);
        } else {
            newProductsIds = [...selectedProductsIdsForReturn, event.target.value];
        }
        setProductsIdsForReturn(newProductsIds);
    }

    return <div className="flex items-center">
        <input id="filter-mobile-color-5" name="product[]" value={product.id} type="checkbox"
               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
               onChange={handleProductSelectionChange}/>
        <label htmlFor="filter-mobile-color-5"
               className="ml-3 min-w-0 flex">{getProductName(getProductBySimpleProduct(product, products), languageVersion)}</label>
    </div>
}

function getProductName(product, languageVersion) {
    return product.name.filter(name => name.language===languageVersion).map(name => name.value)[0];
}
function getComplaintForm(order, languageVersion, isOrderProblemsSelected, possibleOrderProblems, selectedOrderProblems, setSelectedOrderProblems) {
    return <div className="border-t border-gray-200 px-4 py-6" hidden={!isOrderProblemsSelected}>
        <h3 className="-mx-2 -my-3 flex w-full items-center px-2 py-3 text-gray-900 font-medium">
            {getMessage(languageVersion, "markOrderProblems", LABELS)}
        </h3>
        <div className="pt-6" id="filter-section-mobile-0">
            <div className="space-y-6">
                {possibleOrderProblems.map(problem => getOrderProblemCheckbox(problem, languageVersion, selectedOrderProblems, setSelectedOrderProblems))}
            </div>
        </div>

        <Link to="/">
            <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white"
                    type="button">
                {getMessage(languageVersion, "problemWithOrder", LABELS)}
            </button>
        </Link>
    </div>
}

function getOrderProblemCheckbox(problem, languageVersion, selectedOrderProblems, setSelectedOrderProblems) {
    function handleProblemSelectionChange(event) {
        var newOrderProblems;
        if (selectedOrderProblems.filter(productId => productId === event.target.value).length > 0) {
            newOrderProblems = selectedOrderProblems.filter(color => color !== event.target.value);
        } else {
            newOrderProblems = [...selectedOrderProblems, event.target.value];
        }
        setSelectedOrderProblems(newOrderProblems);
    }

    return <div className="flex items-center">
        <input id="filter-mobile-color-5" name="problem[]" value={problem.name} type="checkbox"
               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
               onChange={handleProblemSelectionChange}/>
        <label htmlFor="filter-mobile-color-5"
               className="ml-3 min-w-0 flex">{getMessage(languageVersion, problem.name, possibleOrderProblemsData)}</label>
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
    },
    {
        "name" : "returnOrder",
        "values": [
            {
                "language" : "english",
                "value": "Return order"
            },
            {
                "language" : "polish",
                "value": "Zwróć zamówienie"
            }
        ]
    },
    {
        "name" : "problemWithOrder",
        "values": [
            {
                "language" : "english",
                "value": "Problem with order"
            },
            {
                "language" : "polish",
                "value": "Zgłoś problem z zamówieniem"
            }
        ]
    },
    {
        "name" : "markProductsToReturn",
        "values": [
            {
                "language" : "english",
                "value": "Mark products to return"
            },
            {
                "language" : "polish",
                "value": "Zaznacz produkty do zwrotu"
            }
        ]
    },
    {
        "name" : "markOrderProblems",
        "values": [
            {
                "language" : "english",
                "value": "Mark problems with your order"
            },
            {
                "language" : "polish",
                "value": "Zaznacz problemy ze swoim zamówieniem"
            }
        ]
    }
]