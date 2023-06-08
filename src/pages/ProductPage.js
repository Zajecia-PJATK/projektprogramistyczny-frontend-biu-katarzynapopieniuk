import {useParams} from "react-router-dom";
import Product from "../components/Product";
import React from "react";
import CommentSection from "../components/CommentSection";

export default function ProductPage({products, languageVersion, onAddProduct, onRate = f => f, user}) {
    const {id} = useParams();
    var product = products.filter(product => product.id === id);
    if (product.length == 0) {
        return <div>Product not found</div>
    }
    return <>
        <div className="p-4 sm:ml-64">
            <Product product={product[0]} languageVersion={languageVersion} onAddProduct={onAddProduct}
                     onRate={onRate}/>
            <CommentSection languageVersion={languageVersion} user={user}/>
        </div>
    </>
}