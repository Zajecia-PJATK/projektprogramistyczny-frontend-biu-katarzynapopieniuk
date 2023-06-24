import getMessage from "./LanguageVersionMessageFinder";
import React from "react";

export function getProductName(product, languageVersion) {
    return product.name.filter(name => name.language === languageVersion).map(name => name.value)[0];
}

export function getProductDescription(product, languageVersion) {
    return product.description.filter(name => name.language === languageVersion).map(name => name.value)[0];
}

export function getProductColor(product, languageVersion) {
    return product.color.filter(name => name.language === languageVersion).map(name => name.value)[0];
}

export function getProductCategory(product, languageVersion) {
    return product.category.filter(name => name.language === languageVersion).map(name => name.value)[0];
}

export function getAvailableAmountSection(product, languageVersion) {
    return <div className="pl-5">
        {getMessage(languageVersion, "quantity", LABELS)}
        {product.quantity}
    </div>
}

const LABELS = [
    {
        "name": "quantity",
        "values": [
            {
                "language": "english",
                "value": "Available quantity: "
            },
            {
                "language": "polish",
                "value": "Dostępna ilość: "
            }
        ]
    }
]