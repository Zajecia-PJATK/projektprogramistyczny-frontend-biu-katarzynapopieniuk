import getMessage from "../common/LanguageVersionMessageFinder";
import StarRating from "./rating/StarRating";
import getAverageRating from "./rating/AverageRatingCalculator";

export default function Product({product, languageVersion, onAddProduct, onRate = f => f}) {
    return <div className="flex font-sans w-1/2">
        <div className="flex-none w-56 relative">
            <img src={product.image} alt={product.name}
                 className="absolute inset-0 w-full h-full object-cover rounded-lg"
                 loading="lazy"/>
        </div>
        <form className="flex-auto p-6">
            <div className="flex flex-wrap">
                <h1 className="flex-auto font-medium text-slate-900">
                    {getProductName(product, languageVersion)}
                </h1>
                <div className="w-full flex-none mt-2 order-1 text-3xl font-bold text-violet-600">
                    {product.price}zł
                </div>

            </div>
            <div className="flex space-x-4 mb-5 text-sm font-medium ml-5">
                <div className="flex-auto flex space-x-4">
                    <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white"
                            type="button" onClick={() => onAddProduct(product.id)}>
                        {getAddToBagMessage(languageVersion)}
                    </button>
                </div>
            </div>

            <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">

            </div>

            <div className="flex-auto font-medium text-slate-900">
                {getProductDescription(product, languageVersion)}
            </div>
            <div className="flex-auto font-medium text-slate-900 text-sm">
                {getMessage(languageVersion, "category", MESSAGES)}
                {getProductCategory(product, languageVersion)}
            </div>
            <div className="flex-auto font-medium text-slate-900 text-sm">
                {getMessage(languageVersion, "color", MESSAGES)}
                {getProductColor(product, languageVersion)}
            </div>
            <div className="flex-auto flex space-x-4 ml-2">
                {getStarRating(product, onRate)}
            </div>
            <div className="flex-auto flex space-x-4 ml-2">
                {getMessage(languageVersion, "averageRating", MESSAGES)} {getAverageRating(product)}
            </div>
        </form>
    </div>
}

function getProductName(product, languageVersion) {
    return product.name.filter(name => name.language === languageVersion).map(name => name.value)[0];
}

function getProductDescription(product, languageVersion) {
    return product.description.filter(name => name.language === languageVersion).map(name => name.value)[0];
}

function getProductColor(product, languageVersion) {
    return product.color.filter(name => name.language === languageVersion).map(name => name.value)[0];
}

function getProductCategory(product, languageVersion) {
    return product.category.filter(name => name.language === languageVersion).map(name => name.value)[0];
}

const MESSAGES = [
    {
        "name": "addToBag",
        "values": [
            {
                "language": "english",
                "value": "Add to cart"
            },
            {
                "language": "polish",
                "value": "Dodaj do koszyka"
            }
        ]
    },
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
    },
    {
        "name": "color",
        "values": [
            {
                "language": "english",
                "value": "color: "
            },
            {
                "language": "polish",
                "value": "kolor: "
            }
        ]
    },
    {
        "name": "category",
        "values": [
            {
                "language": "english",
                "value": "category: "
            },
            {
                "language": "polish",
                "value": "kategoria: "
            }
        ]
    }
]

function getAddToBagMessage(languageVersion) {
    return getMessage(languageVersion, "addToBag", MESSAGES);
}

function getStarRating(product, onRate) {
    var rating = product.rating;
    return <StarRating selectedStars={rating} onRate={rating => onRate(product.id, rating)}/>;
}
