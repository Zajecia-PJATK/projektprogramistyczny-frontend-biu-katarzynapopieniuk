import getMessage from "../common/LanguageVersionMessageFinder";
import {Link} from "react-router-dom";
import handleCheckBoxSelectionChange from "../common/CheckBoxOnChangeHandler";
import {useProductColors} from "./ColorProvider";
import {useProductCategories} from "./ProductCategoriesProvider";


export default function SideBar({languageVersion, searchParams, setSearchParams}) {
    const {productCategories} = useProductCategories();
    const { colors } = useProductColors();
    return <aside id="default-sidebar"
                  className="fixed top-28 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                  aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-violet-50">
            <ul className="space-y-2 font-medium">
                {getAllCategoriesListElement(searchParams, setSearchParams, languageVersion)}
                {getProductCategories(productCategories, languageVersion, searchParams, setSearchParams)}
                {getColorFilters(languageVersion, searchParams, setSearchParams, colors)}
                {getPriceFilters(languageVersion, searchParams, setSearchParams)}
            </ul>
        </div>
    </aside>
}

function getProductCategories(categories, languageVersion, searchParams, setSearchParams) {
    return categories.map(category => getProductCategory(category, languageVersion))
        .map(category => getCategoryListElement(category, searchParams, setSearchParams));
}

function getProductCategory(category, languageVersion) {
    return {
        category: category.name,
        displayName: category.displayName.filter(name => name.language == languageVersion).map(name => name.value)[0]
    };
}

function getAllCategoriesListElement(searchParams, setSearchParams, languageVersion) {
    return <li>
        <Link to="/" onClick={() => setSearchParams({
            category: "",
            params: [],
            colors: searchParams.colors,
            price: {min: searchParams.price.min, max: searchParams.price.max}
        })}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-violet-100">

            <span className="ml-3">{getMessage(languageVersion, "all", LABELS)}</span>
        </Link>
    </li>
}

function getCategoryListElement(category, searchParams, setSearchParams) {
    return <li>
        <Link to="/" onClick={() => setSearchParams({
            category: category.category,
            params: [],
            colors: searchParams.colors,
            price: {min: searchParams.price.min, max: searchParams.price.max}
        })}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-violet-100">

            <span className="ml-3">{category.displayName}</span>
        </Link>
    </li>
}

function getColorFilters(languageVersion, searchParams, setSearchParams, productColors) {
    return <div className="border-t border-gray-200 px-4 py-6">
        <h3 className="-mx-2 -my-3 flex w-full items-center justify-between px-2 py-3 text-gray-900 font-medium">
            {getMessage(languageVersion, "color", LABELS)}
        </h3>
        <div class="pt-6" id="filter-section-mobile-0">
            <div class="space-y-6">
                {productColors.map(color => getInputForColor(color, languageVersion, searchParams, setSearchParams))}
            </div>
        </div>
    </div>
}

function getInputForColor(color, languageVersion, searchParams, setSearchParams) {

    function setColors(newColorsFilter) {
        setSearchParams({
            category: searchParams.category,
            params: searchParams.params,
            colors: newColorsFilter,
            price: {min: searchParams.price.min, max: searchParams.price.max}
        })
    }
    function handleColorFilterChange(event) {
        handleCheckBoxSelectionChange(event, searchParams.colors, setColors)
    }

    return <div className="flex items-center">
        <input id="filter-mobile-color-5" name="color[]" value={color.name} type="checkbox"
               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
               onChange={handleColorFilterChange}/>
        <label htmlFor="filter-mobile-color-5"
               className="ml-3 min-w-0 flex-1 text-gray-500">{color.values.filter(color => color.language == languageVersion).map(color => color.value)[0]}</label>
    </div>
}

function getPriceFilters(languageVersion, searchParams, setSearchParams) {
    function setMinPrice(price) {
        updateMinPriceSearchParams(searchParams, setSearchParams, price);
    }

    function setMaxPrice(price) {
        updateMaxPriceSearchParams(searchParams, setSearchParams, price);
    }

    return <div className="border-t border-gray-200 px-4 py-6">
        <h3 className="-mx-2 -my-3 flex w-full px-2 py-3 text-gray-900 font-medium">
            {getMessage(languageVersion, "price", LABELS)}
        </h3>
        <div>
            <label htmlFor="min-price" className="block mb-2 text-sm font-medium text-gray-900">
                {getMessage(languageVersion, "min", LABELS)}</label>
            <input type="text" id="min-price"
                   className="block w-5/12 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
                   onChange={e => setMinPrice(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="max-price" className="block mb-2 text-sm font-medium text-gray-900">
                {getMessage(languageVersion, "max", LABELS)}</label>
            <input type="text" id="max-price"
                   className="block w-5/12 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
                   onChange={e => setMaxPrice(e.target.value)}/>
        </div>
    </div>
}

function updateMinPriceSearchParams(searchParams, setSearchParams, minPrice) {
    var price = searchParams.price;

    var minPriceValue = parseFloat(minPrice);
    if (minPriceValue != null && !isNaN(minPriceValue)) {
        price.min = minPriceValue;
    } else {
        price.min = null;
    }

    setSearchParams({
        category: searchParams.category,
        params: searchParams.params,
        colors: searchParams.colors,
        price: price
    });
}

function updateMaxPriceSearchParams(searchParams, setSearchParams, maxPrice) {
    var price = searchParams.price;

    var maxPriceValue = parseFloat(maxPrice);
    if (maxPriceValue != null && !isNaN(maxPriceValue)) {
        price.max = maxPriceValue;
    } else {
        price.max = null;
    }

    setSearchParams({
        category: searchParams.category,
        params: searchParams.params,
        colors: searchParams.colors,
        price: price
    });
}

const LABELS = [
    {
        "name":
            "all",
        "values":
            [
                {
                    "language": "english",
                    "value": "All categories"
                },
                {
                    "language": "polish",
                    "value": "Wszystkie kategorie"
                }
            ]
    },
    {
        "name":
            "color",
        "values":
            [
                {
                    "language": "english",
                    "value": "Color"
                },
                {
                    "language": "polish",
                    "value": "Kolor"
                }
            ]
    },
    {
        "name":
            "price",
        "values":
            [
                {
                    "language": "english",
                    "value": "Price"
                },
                {
                    "language": "polish",
                    "value": "Cena"
                }
            ]
    },
    {
        "name":
            "min",
        "values":
            [
                {
                    "language": "english",
                    "value": "min"
                },
                {
                    "language": "polish",
                    "value": "min"
                }
            ]
    },
    {
        "name":
            "max",
        "values":
            [
                {
                    "language": "english",
                    "value": "max"
                },
                {
                    "language": "polish",
                    "value": "max"
                }
            ]
    }
]