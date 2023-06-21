import getMessage from "../common/LanguageVersionMessageFinder";
import {FaTrash} from "react-icons/fa";
import getAverageRating from "./rating/AverageRatingCalculator";

export default function CartProduct({product, quantity, languageVersion, onRemove = f => f, updateCartItemCount = f => f}) {
    return <article className="flex items-start space-x-6 p-6 w-5/12">
            <img src={product.image} alt={getProductName(product, languageVersion)} width="60" height="88" className="flex-none rounded-md bg-slate-100" />
            <div className="min-w-0 relative flex-auto text-violet-600 font-bold">
                <div className="font-semibold text-slate-900 truncate pr-20">{getProductName(product, languageVersion)}</div>
                <dl className="mt-2 flex flex-wrap leading-6 text-2xl ml-20">
                    <div className="absolute top-0 right-0 flex items-center space-x-1">
                        <dt className="text-sky-500">
                            <span className="sr-only">Star rating</span>
                            <svg width="16" height="20" fill="currentColor">
                                <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                            </svg>
                        </dt>
                        <dd className="text-sm">{getAverageRating(product)}</dd>
                    </div>
                    <div className="ml-2">
                        {quantity}
                    </div>
                    <div className="pl-5">
                        {product.price} zł
                    </div>
                    <div className="pl-5">
                        {quantity * product.price} zł
                    </div>
                    <div className="ml-5">
                        <button onClick = {() => onRemove(product.id)}>
                            <FaTrash size="20"/>
                        </button>
                    </div>
                </dl>
                <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>
            </div>
        </article>
}

function getProductName(product, languageVersion) {
    return product.name.filter(name => name.language==languageVersion).map(name => name.value)[0];
}