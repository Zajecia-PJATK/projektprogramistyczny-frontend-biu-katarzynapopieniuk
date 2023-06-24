import React from "react";
import getMessage from "../common/LanguageVersionMessageFinder";
import {Link} from "react-router-dom";
import {getAvailableAmountSection} from "../common/ProductDataRetriever";

export default function ProductManager({languageVersion, products, setProducts}) {
    function onRemoveProduct(product) {
        const newProducts = products.filter(p => p.id !== product.id);
        setProducts(newProducts);
    }

    return <>
        <div className="pl-5 min-w-0 pt-5 font-semibold">
                <Link to="/newproduct" className="px-6 font-semibold rounded-full bg-violet-600 text-white">
                    {getMessage(languageVersion, "newProduct", LABELS)}
                </Link>
            </div>
        <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>
        {products.map(product => getProductDisplay(product, languageVersion, onRemoveProduct))}
    </>
}

function getProductDisplay(product, languageVersion, onRemoveProduct) {
    return <article className="flex items-start space-x-6 p-6 w-10/12">
        <img src={product.image} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />
        <div className="min-w-0 relative flex-auto text-violet-600 font-bold">
            <div className="font-semibold text-slate-900 truncate pr-20">{getProductName(product, languageVersion)}</div>
            <div className="mt-2 flex flex-wrap leading-6 text-2xl ml-20">
                <div className="pl-5">
                    {product.price} zł
                </div>
                {getAvailableAmountSection(product, languageVersion)}
                <div className="pl-5">
                    <Link to={`/editproduct/${product.id}`} className="px-6 font-semibold rounded-full bg-violet-600 text-white">
                        {getMessage(languageVersion, "edit", LABELS)}
                    </Link>
                </div>
                <div className="pl-5">
                    <button type="button" className="px-6 font-semibold rounded-full bg-violet-600 text-white"
                            onClick={() => onRemoveProduct(product)}>
                        {getMessage(languageVersion, "remove", LABELS)}
                    </button>
                </div>
            </div>
            <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>
        </div>
    </article>
}

function getProductName(product, languageVersion) {
    return product.name.filter(name => name.language===languageVersion).map(name => name.value)[0];
}

const LABELS = [
    {
        "name" : "quantity",
        "values": [
            {
                "language" : "english",
                "value": "Available quantity: "
            },
            {
                "language" : "polish",
                "value": "Dostępna ilość: "
            }
        ]
    },
    {
        "name" : "edit",
        "values": [
            {
                "language" : "english",
                "value": "Edit"
            },
            {
                "language" : "polish",
                "value": "Edytuj"
            }
        ]
    },
    {
        "name" : "remove",
        "values": [
            {
                "language" : "english",
                "value": "Remove"
            },
            {
                "language" : "polish",
                "value": "Usuń"
            }
        ]
    },
    {
        "name" : "newProduct",
        "values": [
            {
                "language" : "english",
                "value": "Add new product"
            },
            {
                "language" : "polish",
                "value": "Dodaj nowy produkt"
            }
        ]
    }
]