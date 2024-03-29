import {Link, useParams} from "react-router-dom";
import getMessage from "../common/LanguageVersionMessageFinder";
import React, {useReducer, useState} from "react";
import NotFoundPage from "./NotFoundPage";
import OrderSummary from "../components/orders/OrderSummary";
import getProductBySimpleProduct from "../common/ProductRetriever";
import possibleOrderProblemsData from "../config/possibleOrderProblems.json";
import handleCheckBoxSelectionChange from "../common/CheckBoxOnChangeHandler";
import possibleOrderStatusesData from "../config/possibleOrderStatuses.json";
import getToggleButton from "../common/ToggleButton";
import {getAddress, getStatus} from "../components/orders/OrderDataRetriever";
import {useInput} from "../common/InputUtils";
import getProblemsIfReported from "../common/OrderProblemsRetriever";

export default function OrderPage({languageVersion, orders, loggedUserEmail, products, setOrders}) {
    const {id} = useParams();
    const [isReturnOrderSelected, toggleReturnOrderSelection] = useReducer(isReturnOrderSelected => !isReturnOrderSelected, false);
    const [isOrderProblemsSelected, toggleOrderProblemsSelection] = useReducer(isOrderProblemsSelected => !isOrderProblemsSelected, false);
    const [selectedProductsIdsForReturn, setProductsIdsForReturn] = useState([]);
    const [possibleOrderProblems] = useState(possibleOrderProblemsData);
    const [selectedOrderProblems, setSelectedOrderProblems] = useState([]);
    const [possibleOrderStatuses] = useState(possibleOrderStatusesData);
    const [complaintMessage] = useInput("");

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

    function addComplaint(o) {
        const newProblem = {
            "type" : selectedOrderProblems,
            "description": complaintMessage.value
        }
        var oldProblems = o.reportedProblems;
        o.reportedProblems = [...oldProblems, newProblem];
        o.status = "problemReported"
        return o;
    }

    function onComplain() {
        const newOrders = orders.map(o => o.id === order.id ? addComplaint(o) : o);
        setOrders(newOrders);
    }

    return <div className="p-4 sm:ml-64">
        <OrderSummary order={order} languageVersion={languageVersion} products={products}/>
        {getAddress(order, languageVersion)}
        {getStatus(order, languageVersion, possibleOrderStatuses)}
        {getProblemsIfReported(order, languageVersion, possibleOrderProblems)}
        {getToggleButton(toggleReturnOrderSelection, languageVersion, "returnOrder", LABELS, idOrderStatusPossibleToComplain(order))}
        {getReturnOrderForm(order, languageVersion, isReturnOrderSelected, selectedProductsIdsForReturn, setProductsIdsForReturn, products)}
        {getToggleButton(toggleOrderProblemsSelection, languageVersion, "problemWithOrder", LABELS, idOrderStatusPossibleToComplain(order))}
        {getComplaintForm(order, languageVersion, isOrderProblemsSelected, possibleOrderProblems, selectedOrderProblems, setSelectedOrderProblems, complaintMessage, onComplain)}
    </div>
}

function getOrderForUser(orders, loggedUserEmail, id) {
    return orders.filter(order => order.userEmail === loggedUserEmail)
        .filter(order => order.id === id);
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

        <Link to={`/returnPolicy/${order.id}`}>
            <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white"
                    type="button">
                {getMessage(languageVersion, "returnOrder", LABELS)}
            </button>
        </Link>
    </div>
}

function getReturnProductCheckbox(product, languageVersion, selectedProductsIdsForReturn, setProductsIdsForReturn, products) {
    function handleProductSelectionChange(event) {
        handleCheckBoxSelectionChange(event, selectedProductsIdsForReturn, setProductsIdsForReturn);
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
    return product.name.filter(name => name.language === languageVersion).map(name => name.value)[0];
}

function getComplaintForm(order, languageVersion, isOrderProblemsSelected, possibleOrderProblems, selectedOrderProblems, setSelectedOrderProblems, complaintMessage, onComplain) {
    return <div className="border-t border-gray-200 px-4 py-6" hidden={!isOrderProblemsSelected}>
        <h3 className="-mx-2 -my-3 flex w-full items-center px-2 py-3 text-gray-900 font-medium">
            {getMessage(languageVersion, "markOrderProblems", LABELS)}
        </h3>
        <div className="pt-6" id="filter-section-mobile-0">
            <div className="space-y-6">
                {possibleOrderProblems.map(problem => getOrderProblemCheckbox(problem, languageVersion, selectedOrderProblems, setSelectedOrderProblems))}
            </div>
        </div>
        <h3 className="-mx-2 -my-3 flex w-full items-center px-2 py-3 text-gray-900 font-medium pt-6">
            {getMessage(languageVersion, "describeYourProblem", LABELS)}
        </h3>
        <textarea {...complaintMessage}
                  id="comment" rows="6"
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none bg-amber-50"
                  placeholder="..." required></textarea>

        <Link to="/">
            <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white"
                    type="button"
                    onClick={onComplain}>
                {getMessage(languageVersion, "problemWithOrder", LABELS)}
            </button>
        </Link>
    </div>
}

function getOrderProblemCheckbox(problem, languageVersion, selectedOrderProblems, setSelectedOrderProblems) {
    function handleProblemSelectionChange(event) {
        handleCheckBoxSelectionChange(event, selectedOrderProblems, setSelectedOrderProblems)
    }

    return <div className="flex items-center">
        <input id="filter-mobile-color-5" name="problem[]" value={problem.name} type="checkbox"
               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
               onChange={handleProblemSelectionChange}/>
        <label htmlFor="filter-mobile-color-5"
               className="ml-3 min-w-0 flex">{getMessage(languageVersion, problem.name, possibleOrderProblemsData)}</label>
    </div>
}

function idOrderStatusPossibleToComplain(order) {
    return order.status !== "sent" && order.status !== "problemSolved";
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
        "name": "returnOrder",
        "values": [
            {
                "language": "english",
                "value": "Return order"
            },
            {
                "language": "polish",
                "value": "Zwróć zamówienie"
            }
        ]
    },
    {
        "name": "problemWithOrder",
        "values": [
            {
                "language": "english",
                "value": "Problem with order"
            },
            {
                "language": "polish",
                "value": "Zgłoś problem z zamówieniem"
            }
        ]
    },
    {
        "name": "markProductsToReturn",
        "values": [
            {
                "language": "english",
                "value": "Mark products to return"
            },
            {
                "language": "polish",
                "value": "Zaznacz produkty do zwrotu"
            }
        ]
    },
    {
        "name": "markOrderProblems",
        "values": [
            {
                "language": "english",
                "value": "Mark problems with your order"
            },
            {
                "language": "polish",
                "value": "Zaznacz problemy ze swoim zamówieniem"
            }
        ]
    },
    {
        "name": "describeYourProblem",
        "values": [
            {
                "language": "english",
                "value": "Describe your problem."
            },
            {
                "language": "polish",
                "value": "Opisz swój problem."
            }
        ]
    }
]
