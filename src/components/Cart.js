import CartProduct from "./CartProduct";
import getMessage from "../common/LanguageVersionMessageFinder";
import React, {useMemo, useState} from "react";
import getCartTotalPrice from "../common/CartTotalPriceCalculator";
import {useInput} from "../common/InputUtils";

export default function Cart({cart = [], setCart = f => f, products = [], languageVersion, discountCodes, discountValue,
                                 setDiscountValue, productCoupons, usedProductCoupons, setUsedProductCoupons}) {
    const [total, setTotal] = useState();
    const [discountCode] = useInput("");
    const [couponCode] = useInput("");
    useMemo(() => {
        setTotal(
            getCartTotalPrice(cart, products, discountValue, usedProductCoupons)
        );
    }, [cart, discountValue, usedProductCoupons]);

    function checkDiscountValue() {
        const discount = discountCodes.filter(code => code.code === discountCode.value)
            .map(code => code.discount);
        if(discount.length > 0) {
            setDiscountValue(discount[0]);
        } else {
            setDiscountValue(0);
        }
    }

    function onAddProductCoupon() {
        const foundCoupon = productCoupons.filter(code => code.code === couponCode.value);
        if(foundCoupon.length === 0) {
            return;
        }

        if(usedProductCoupons.filter(code => code.productId === foundCoupon.productId).length > 0) {
            return;
        }

        setUsedProductCoupons([...usedProductCoupons, foundCoupon[0]]);
    }
    return <>
        {getCartProducts(cart, setCart, products, languageVersion)}
        <div>
            {getMessage(languageVersion, "discountCode", LABELS)}
        </div>
        {getTextInput(discountCode)}
        <div hidden={discountValue === 0} className="p-4">
            {`${getMessage(languageVersion, "discountValue", LABELS)} ${discountValue} %`}
        </div>
        <button type="button"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-violet-100 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                onClick={checkDiscountValue}>
            {getMessage(languageVersion, "useDiscountCode", LABELS)}
        </button>
        <div>
            {getMessage(languageVersion, "productCoupon", LABELS)}
        </div>
        {getTextInput(couponCode)}
        <button type="button"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-violet-100 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                onClick={onAddProductCoupon}>
            {getMessage(languageVersion, "useProductCoupon", LABELS)}
        </button>
        <div hidden={usedProductCoupons.length === 0} className="p-4">
            {getMessage(languageVersion, "usedCodes", LABELS)}
            {usedProductCoupons.map(code => code.code).join(', ')}
        </div>
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
    if(foundProducts.length === 0) {
        return null;
    }

    return foundProducts[0];
}

function getTextInput(text) {
    return <div>
        <input type="text" {...text}
               id="comment"
               className="px-0 w-3/12 text-xl text-gray-900 border-0 focus:ring-0 focus:outline-none bg-amber-50"
               placeholder="..." required/>
    </div>
}

function getCartTotal(total, languageVersion) {
    return <div className="min-w-0 relative flex-auto text-violet-600 font-bold p-4">
        {getMessage(languageVersion, "total", LABELS)}
        {total}zł
    </div>
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
    },
    {
        "name" : "discountCode",
        "values": [
            {
                "language" : "english",
                "value": "Discount code"
            },
            {
                "language" : "polish",
                "value": "Kod promocyjny"
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
    },
    {
        "name" : "useDiscountCode",
        "values": [
            {
                "language" : "english",
                "value": "Use discount code"
            },
            {
                "language" : "polish",
                "value": "Użyj kodu promocyjnego"
            }
        ]
    },
    {
        "name" : "productCoupon",
        "values": [
            {
                "language" : "english",
                "value": "Product coupon code"
            },
            {
                "language" : "polish",
                "value": "Kod kuponu na produkt"
            }
        ]
    },
    {
        "name" : "useProductCoupon",
        "values": [
            {
                "language" : "english",
                "value": "Use product coupon"
            },
            {
                "language" : "polish",
                "value": "Użyj kuponu"
            }
        ]
    },
    {
        "name" : "usedCodes",
        "values": [
            {
                "language" : "english",
                "value": "Used product coupons: "
            },
            {
                "language" : "polish",
                "value": "Użyte kupony produktowe: "
            }
        ]
    }
]