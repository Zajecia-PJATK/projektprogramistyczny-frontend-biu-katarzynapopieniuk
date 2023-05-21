import {useParams} from "react-router-dom";
import Product from "../components/Product";

export default function ProductPage({products, languageVersion}) {
    const {id} = useParams();
    var product = products.filter(product => product.id === id);
    if(product.length == 0) {
        return <div>Product not found</div>
    }
    return <div>
        <Product product={product[0]} languageVersion={languageVersion}/>
    </div>
}