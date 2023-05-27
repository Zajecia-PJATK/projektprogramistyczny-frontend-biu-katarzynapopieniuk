import getMessage from "../common/LanguageVersionMessageFinder";

export default function Product({product, languageVersion, onAddProduct}) {
    return <div className="flex font-sans w-1/2">
        <div className="flex-none w-56 relative">
            <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover rounded-lg"
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
            <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                <div className="space-x-2 flex text-sm font-bold">
                    {getOptions(product.options)}
                </div>
            </div>
            <div className="flex space-x-4 mb-5 text-sm font-medium">
                <div className="flex-auto flex space-x-4">
                    <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white"
                            type="button" onClick={() => onAddProduct(product.id, "a")}>
                        {getAddToBagMessage(languageVersion)}
                    </button>
                </div>
                <button
                    className="flex-none flex items-center justify-center w-9 h-9 rounded-full text-violet-600 bg-violet-50"
                    type="button" aria-label="Like">
                    <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                    </svg>
                </button>
            </div>
            <div className="flex-auto font-medium text-slate-900">
                {getProductDescription(product, languageVersion)}
            </div>
        </form>
    </div>
}

function getProductName(product, languageVersion) {
    return product.name.filter(name => name.language==languageVersion).map(name => name.value)[0];
}
function getProductDescription(product, languageVersion) {
    return product.description.filter(name => name.language==languageVersion).map(name => name.value)[0];
}

const MESSAGES = [
    {
        "name" : "addToBag",
        "values": [
            {
                "language" : "english",
                "value": "Add to bag"
            },
            {
                "language" : "polish",
                "value": "Dodaj do koszyka"
            }
        ]
    }
]

function getAddToBagMessage(languageVersion) {
    return getMessage(languageVersion, "addToBag", MESSAGES);
}
function getOptions(options) {
    return options.filter(option => option.quantity > 0)
        .map(option => option.option)
        .map(option => getOption(option));
}

function getOption(option) {
    return <label>
        <input className="sr-only peer" name="size" type="radio" value={option}/>
        <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-violet-400 peer-checked:bg-violet-600 peer-checked:text-white">
            {option}
        </div>
    </label>
}

