import React from "react";
import OrderForm from "../components/orders/OrderForm";

export default function CheckoutPage({cart=[], products = [], languageVersion, addOrder, loggedUserEmail, setCart}) {
    return <div className="p-4 sm:ml-64">
        <OrderForm languageVersion={languageVersion} cart={cart} products={products} addOrder={addOrder} loggedUserEmail={loggedUserEmail} setCart={setCart}/>
    </div>
}