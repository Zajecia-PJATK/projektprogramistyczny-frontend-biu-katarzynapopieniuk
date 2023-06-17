import React, {createContext, useContext, useState} from "react";
import productCategoriesData from "../config/productCategories.json";

const ProductCategoriesContext = createContext();

export const useProductCategories = () => useContext(ProductCategoriesContext);

export default function ProductCategoriesProvider ({ children }) {
    const [productCategories, setProductCategories] = useState(productCategoriesData);
    return (
        <ProductCategoriesContext.Provider value={{ productCategories, setProductCategories }}>
            {children}
        </ProductCategoriesContext.Provider>
    );
};