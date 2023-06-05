import {useState} from "react";
import productCategoriesData from "../config/productCategories.json";
import getMessage from "../common/LanguageVersionMessageFinder";
import {Link} from "react-router-dom";
export default function SideBar({languageVersion, setSearchParams}) {
    const [productCategories, setProductCategories] = useState(productCategoriesData);

    return <aside id="default-sidebar"
                 className="fixed top-28 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                 aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-violet-50">
            <ul className="space-y-2 font-medium">
                {getAllCategoriesListElement(setSearchParams, languageVersion)}
                {getProductCategories(productCategories, languageVersion, setSearchParams)}
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

function getAllCategoriesListElement(setSearchParams, languageVersion) {
    return <li>
        <Link to="/" onClick={() => setSearchParams({category: "", params: []})}
             className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-violet-100">

            <span className="ml-3">{getMessage(languageVersion, "all", MESSAGES)}</span>
        </Link>
    </li>
}
function getCategoryListElement(category, setSearchParams) {
    return <li>
        <Link to="/" onClick={() => setSearchParams({category: category.category, params: []})}
           className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-violet-100">

            <span className="ml-3">{category.displayName}</span>
        </Link>
    </li>
}

const MESSAGES = [
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
    }
]