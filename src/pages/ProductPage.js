import {useParams} from "react-router-dom";
import Product from "../components/Product";

export default function ProductPage({products, languageVersion, onAddProduct, onRate = f => f}) {
    const {id} = useParams();
    var product = products.filter(product => product.id === id);
    if(product.length == 0) {
        return <div>Product not found</div>
    }
    return <div className="p-4 sm:ml-64">
        <Product product={product[0]} languageVersion={languageVersion} onAddProduct={onAddProduct} onRate={onRate}/>
    </div>
}