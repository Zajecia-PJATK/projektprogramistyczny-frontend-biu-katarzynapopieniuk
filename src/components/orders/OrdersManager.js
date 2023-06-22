import React, {useState} from "react";
import possibleOrderStatusesData from "../../config/possibleOrderStatuses.json";
import getOrderProducts, {getAddress, getOrderDiscount, getOrderTotal, getStatus} from "./OrderDataRetriever";
import getMessage from "../../common/LanguageVersionMessageFinder";
import possibleOrderProblemsData from "../../config/possibleOrderProblems.json";
import getProblemsIfReported from "../../common/OrderProblemsRetriever";

export default function OrdersManager({languageVersion, orders, setOrders, products}) {
    const [possibleOrderStatuses] = useState(possibleOrderStatusesData);
    const [possibleOrderProblems] = useState(possibleOrderProblemsData);

    function modifyOrderStatus(id, newStatus) {
        const newOrders = orders.map(order => order.id === id ? updateStatus(order, newStatus) : order);
        setOrders(newOrders);
    }

    return orders.map(order => getSingleOrderManagementForm(languageVersion, order, products, possibleOrderStatuses, modifyOrderStatus, possibleOrderProblems));
}

function updateStatus(order, newStatus) {
    order.status = newStatus;
    return order;
}

function getSingleOrderManagementForm(languageVersion, order, products, possibleOrderStatuses, modifyOrderStatus, possibleOrderProblems) {
    return <div className="border-4 border-violet-400">
        {wrapInBasicDiv(`Id: ${order.id}`)}
        {wrapInBasicDiv(`Email: ${order.userEmail}`)}
        {getOrderProducts(order, products, languageVersion)}
        {getOrderDiscount(order, languageVersion)}
        {getOrderTotal(order.totalPrice, languageVersion)}
        {getAddress(order, languageVersion)}
        {getStatus(order, languageVersion, possibleOrderStatuses)}
        {getProblemsIfReported(order, languageVersion, possibleOrderProblems)}
        {getChangeStatusButtons(languageVersion, order, possibleOrderStatuses, modifyOrderStatus)}
    </div>
}

function getChangeStatusButtons(languageVersion, order, possibleOrderStatuses, modifyOrderStatus) {
    return findOrderStatusByName(order.status, possibleOrderStatuses)
        .next.map(nextStatus => findOrderStatusByName(nextStatus, possibleOrderStatuses))
        .map(nextStatus => getButtonForChangeStatus(languageVersion, order.id, nextStatus.name, modifyOrderStatus, possibleOrderStatuses));
}

function findOrderStatusByName(statusName, possibleOrderStatuses) {
    return possibleOrderStatuses.filter(status => status.name === statusName)[0];
}

function getButtonForChangeStatus(languageVersion, orderId, nextStatus, modifyOrderStatus, possibleOrderStatuses) {
    return <div className="flex space-x-4 mb-5 text-sm font-medium ml-5">
        <div className="flex-auto flex space-x-4">
            <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white"
                    type="button" onClick={() => modifyOrderStatus(orderId, nextStatus)}>
                {getMessage(languageVersion, nextStatus, possibleOrderStatuses)}
            </button>
        </div>
    </div>
}

function wrapInBasicDiv(content) {
    return <div className="border-2 border-violet-100">
        {content}
    </div>
}