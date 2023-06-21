import {useParams} from "react-router-dom";
import React from "react";
import NotFoundPage from "./NotFoundPage";
import ProductCreator from "../components/ProductCreator";

export default function EditProductPage({languageVersion, products,  setProducts, isLoggedUserAdmin}) {
    const {id} = useParams();
    if(!isLoggedUserAdmin) {
        return <NotFoundPage languageVersion={languageVersion}/>
    }

    var foundProducts = products.filter(product => product.id === id);
    if (foundProducts.length === 0) {
        return <div>Product not found</div>
    }

    var product = foundProducts[0];

    function onSaveProduct(newProduct) {
        var newProducts = products.map(p => p.id === id ? newProduct : p);
        setProducts(newProducts);
    }

    return <ProductCreator languageVersion={languageVersion} product={product} onSaveProduct={onSaveProduct}/>
}