import SimpleProduct from "../components/home/SimpleProduct";
import {useParams} from "react-router-dom";

export default function CategoryPage({products, languageVersion}) {
    const {category} = useParams();
    return <div>
        <div className="p-4 sm:ml-64">
            {products.filter(product => getProductCategory(product) === category)
                .map(product => <SimpleProduct product={product} languageVersion={languageVersion}/>)}
        </div>
    </div>
}

function getProductCategory(product) {
    return product.category.filter(name => name.language=="english").map(name => name.value)[0];
}