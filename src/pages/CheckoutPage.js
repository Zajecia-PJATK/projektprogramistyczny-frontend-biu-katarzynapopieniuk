import React from "react";
import OrderForm from "../components/orders/OrderForm";

export default function CheckoutPage({cart=[], products = [], languageVersion, addOrder, loggedUserEmail, setCart, discountValue = 0, usedProductCoupons=[]}) {
    return <div className="p-4 sm:ml-64">
        <OrderForm languageVersion={languageVersion} cart={cart} products={products} addOrder={addOrder} loggedUserEmail={loggedUserEmail}
                   setCart={setCart} discountValue={discountValue} usedProductCoupons={usedProductCoupons}/>
    </div>
}