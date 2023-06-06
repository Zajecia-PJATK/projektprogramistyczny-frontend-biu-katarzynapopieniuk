import {useState} from "react";
import productCategoriesData from "../config/productCategories.json";
import getMessage from "../common/LanguageVersionMessageFinder";
import {Link} from "react-router-dom";
export default function SideBar({languageVersion, searchParams, setSearchParams, productColors}) {
    const [productCategories, setProductCategories] = useState(productCategoriesData);

    return <aside id="default-sidebar"
                 className="fixed top-28 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                 aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-violet-50">
            <ul className="space-y-2 font-medium">
                {getAllCategoriesListElement(searchParams, setSearchParams, languageVersion)}
                {getProductCategories(productCategories, languageVersion, searchParams, setSearchParams)}
                {getFilters(languageVersion, searchParams, setSearchParams, productColors)}
            </ul>
        </div>
    </aside>
}
function getProductCategories(categories, languageVersion, setSearchParams) {
    return categories.map(category => getProductCategory(category, languageVersion))
        .map(category => getCategoryListElement(category, setSearchParams));
}
function getProductCategory(category, languageVersion) {
    return {
        category: category.name,
        displayName: category.displayName.filter(name => name.language==languageVersion).map(name => name.value)[0]
    };
}

function getAllCategoriesListElement(searchParams, setSearchParams, languageVersion) {
    return <li>
        <Link to="/" onClick={() => setSearchParams({category: "", params: [], colors: searchParams.colors})}
             className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-violet-100">

            <span className="ml-3">{getMessage(languageVersion, "all", LABELS)}</span>
        </Link>
    </li>
}
function getCategoryListElement(category, searchParams, setSearchParams) {
    return <li>
        <Link to="/" onClick={() => setSearchParams({category: category.category, params: [], colors: searchParams.colors})}
           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-violet-100">

            <span className="ml-3">{category.displayName}</span>
        </Link>
    </li>
}

function getFilters(languageVersion, searchParams, setSearchParams, productColors) {
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
    function handleColorFilterChange(event) {
        var newColorsFilter;
        if(searchParams.colors.filter(color => color === event.target.value).length > 0) {
            newColorsFilter = searchParams.colors.filter(color => color !== event.target.value);
        } else {
            newColorsFilter = [...searchParams.colors, event.target.value];
        }
        setSearchParams({category: searchParams.category, params: searchParams.params, colors: newColorsFilter})
    }

    return <div className="flex items-center">
        <input id="filter-mobile-color-5" name="color[]" value={color.name} type="checkbox"
               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={handleColorFilterChange}/>
        <label htmlFor="filter-mobile-color-5"
               className="ml-3 min-w-0 flex-1 text-gray-500">{color.values.filter(color => color.language==languageVersion).map(color => color.value)[0]}</label>
    </div>
}

const LABELS = [
    {
        "name" : "all",
        "values": [
            {
                "language" : "english",
                "value": "All categories"
            },
            {
                "language" : "polish",
                "value": "Wszystkie kategorie"
            }
        ]
    },
    {
        "name" : "color",
        "values": [
            {
                "language" : "english",
                "value": "Color"
            },
            {
                "language" : "polish",
                "value": "Kolor"
            }
        ]
    }
]