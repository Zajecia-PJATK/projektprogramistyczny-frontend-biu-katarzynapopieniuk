import CartProduct from "./CartProduct";
import getMessage from "../common/LanguageVersionMessageFinder";
import {useMemo, useState} from "react";

export default function Cart({cart = [], setCart = f => f, products = [], languageVersion}) {
    const [total, setTotal] = useState();
    useMemo(() => {
        setTotal(
            getCartTotalPrice(cart, products)
        );
    }, [cart]);

    return <>
        {getCartProducts(cart, setCart, products, languageVersion)}
        {getCartTotal(total, languageVersion)}
    </>
}

function getCartProducts(cart, setCart, products, languageVersion) {
    function removeCartProduct(id) {
        const newCart = cart.filter(simpleProduct => simpleProduct.id !== id)
        setCart(newCart)
    }

    return cart.map(simpleProduct => getCartProduct(simpleProduct, products, languageVersion, removeCartProduct))
        .filter(simpleProduct => simpleProduct != null);
}

function getCartProduct(simpleProduct, products, languageVersion, onRemove) {
    var product = getProduct(simpleProduct, products);
    if(product == null) {
        return null;
    }
    return <CartProduct product={product} quantity={simpleProduct.quantity} languageVersion={languageVersion} onRemove={onRemove}/>
}

function getProduct(simpleProduct, products) {
    var foundProducts = products.filter(product => product.id === simpleProduct.id);
    if(foundProducts.length == 0) {
        return null;
    }

    return foundProducts[0];
}

function getCartTotal(total, languageVersion) {
    return <div className="min-w-0 relative flex-auto text-violet-600 font-bold">
        {getMessage(languageVersion, "total", LABELS)}
        {total}zł
    </div>
}

function getCartTotalPrice(cart, products) {
    return cart.map(simpleProduct => getProductTotalPrice(simpleProduct, products))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function getProductTotalPrice(simpleProduct, products) {
    var product = getProduct(simpleProduct, products);
    if(product == null) {
        return 0;
    }

    return product.price * simpleProduct.quantity;
}

const LABELS = [
    {
        "name" : "total",
        "values": [
            {
                "language" : "english",
                "value": "total: "
            },
            {
                "language" : "polish",
                "value": "suma: "
            }
        ]
    }
]