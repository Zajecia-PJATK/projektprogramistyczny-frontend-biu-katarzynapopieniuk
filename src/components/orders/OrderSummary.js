import {Link} from "react-router-dom";
import getOrderProducts, {getOrderDiscount, getOrderTotal, getUsedProductCodes} from "./OrderDataRetriever";
import React from "react";

export default function OrderSummary({order, products = [], languageVersion}) {

    return <Link to={`/myorders/${order.id}`}>
        <div className="border-4 border-violet-400">
            {getOrderProducts(order, products, languageVersion)}
            {getOrderDiscount(order, languageVersion)}
            {getUsedProductCodes(order, languageVersion)}
            {getOrderTotal(order.totalPrice, languageVersion)}
        </div>
    </Link>
}