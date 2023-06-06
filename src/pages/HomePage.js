import SimpleProduct from "../components/home/SimpleProduct";
import SearchBar from "../components/SearchBar";
import React from "react";
import colors from "tailwindcss/colors";

export default function HomePage({products, languageVersion, searchParams, setSearchParams}) {
    return <div>
        <SearchBar languageVersion={languageVersion} searchParams={searchParams} setSearchParams={setSearchParams}/>
        <div className="p-4 sm:ml-64">
            {products.filter(product => isNotFiltered(product, searchParams))
                .map(product => <SimpleProduct product={product} languageVersion={languageVersion}/>)}
        </div>
    </div>
}

function isNotFiltered(product, searchParams) {
    return isNotFilteredCategory(product, searchParams)
        && isNotFilteredByParams(product, searchParams)
        && isNotFilteredByColor(product, searchParams);
}

function isNotFilteredCategory(product, searchParams) {
    if(searchParams.category === "") {
        return true;
    }

    return searchParams.category === getProductCategory(product);
}
function getProductCategory(product) {
    return product.category.filter(name => name.language=="english").map(name => name.value)[0];
}

function isNotFilteredByParams(product, searchParams) {
    if(searchParams.params.length === 0) {
        return true;
    }

    return searchParams.params
        .filter(param => isMatchingProduct(product, param))
        .length > 0
}

function isMatchingProduct(product, param) {
    return product.name.filter(name => name.value.includes(param)).length > 0
        || product.description.filter(description => description.value.includes(param)).length > 0;
}

function isNotFilteredByColor(product, searchParams) {
    if(searchParams.colors.length > 0) {
        return searchParams.colors.filter(color => color === getProductColor(product)).length > 0;
    }

    return true;
}

function getProductColor(product) {
    return product.color.filter(color => color.language==="english").map(color => color.value)[0];
}