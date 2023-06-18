import getMessage from "../../common/LanguageVersionMessageFinder";
import {Link} from "react-router-dom";
import getOrderProducts from "./OrderDataRetriever";

export default function OrderSummary({order, products = [], languageVersion}) {

    return <Link to={`/myorders/${order.id}`}>
        <div className="border-4 border-violet-400">
            {getOrderProducts(order, products, languageVersion)}
            {getOrderTotal(order.totalPrice, languageVersion)}
        </div>
    </Link>
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