import getMessage from "../../common/LanguageVersionMessageFinder";
import getAverageRating from "../rating/AverageRatingCalculator";
import {Link} from "react-router-dom";

export default function SimpleProduct({product, languageVersion}) {
    return <Link to={`/products/${product.id}`}>
        <div className="flex font-sans w-1/2 border-8 border-violet-200 block cursor-pointer">
            <div className="flex-none w-56 relative">
                <img src={product.image} alt={product.name}
                     className="absolute inset-0 w-full h-full object-cover rounded-lg"
                     loading="lazy"/>
            </div>
            <div className="flex-auto p-12">
                <div className="flex-auto font-medium text-slate-900">
                    {getProductName(product, languageVersion)}
                </div>
                <div className="w-full flex-auto text-3xl font-bold text-violet-600">
                    {product.price}zł
                </div>

                <div className="flex items-center space-x-1 m-5">
                    <dt className="text-sky-500">
                        <span className="sr-only">Star rating</span>
                        <svg width="16" height="20" fill="currentColor">
                            <path
                                d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z"/>
                        </svg>
                    </dt>
                    <dd className="text-sm">{getAverageRating(product)}</dd>
                </div>
            </div>
        </div>
    </Link>
}

function getProductName(product, languageVersion) {
    return product.name.filter(name => name.language == languageVersion).map(name => name.value)[0];
}

const MESSAGES = [
    {
        "name": "averageRating",
        "values": [
            {
                "language": "english",
                "value": "average rating: "
            },
            {
                "language": "polish",
                "value": "średnia ocena: "
            }
        ]
    }
]

