import React from "react";
import NotFoundPage from "./NotFoundPage";
import ProductCreator from "../components/ProductCreator";

export default function NewProductPage({languageVersion, products,  setProducts, isLoggedUserAdmin}) {
    if(!isLoggedUserAdmin) {
        return <NotFoundPage languageVersion={languageVersion}/>
    }

    function onSaveProduct(newProduct) {
        var newProducts = [...products, newProduct];
        setProducts(newProducts);
    }

    return <ProductCreator languageVersion={languageVersion} onSaveProduct={onSaveProduct}/>
}