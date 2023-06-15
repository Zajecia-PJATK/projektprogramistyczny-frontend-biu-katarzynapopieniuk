import getMessage from "../../common/LanguageVersionMessageFinder";
import OrderProduct from "./OrderProduct";
import {Link} from "react-router-dom";

export default function OrderSummary({order, products = [], languageVersion}) {

    return <Link to={`/myorders/${order.id}`}>
        <div className="border-4 border-violet-400">
            {getOrderProducts(order, products, languageVersion)}
            {getOrderTotal(order.totalPrice, languageVersion)}
        </div>
    </Link>
}

function getOrderProducts(order, products, languageVersion) {
    return order.products.map(simpleProduct => getOrderProduct(simpleProduct, products, languageVersion))
        .filter(simpleProduct => simpleProduct != null);
}

function getOrderProduct(simpleProduct, products, languageVersion) {
    var product = getProduct(simpleProduct, products);
    if (product == null) {
        return null;
    }
    return <OrderProduct product={product} quantity={simpleProduct.quantity} languageVersion={languageVersion}/>
}

function getProduct(simpleProduct, products) {
    var foundProducts = products.filter(product => product.id === simpleProduct.id);
    if (foundProducts.length === 0) {
        return null;
    }

    return foundProducts[0];
}

function getOrderTotal(total, languageVersion) {
    return <div className="min-w-0 relative flex-auto text-violet-600 font-bold">
        {getMessage(languageVersion, "total", LABELS)}
        {total}zł
    </div>
}

const LABELS = [
    {
        "name": "total",
        "values": [
            {
                "language": "english",
                "value": "total: "
            },
            {
                "language": "polish",
                "value": "suma: "
            }
        ]
    }
]