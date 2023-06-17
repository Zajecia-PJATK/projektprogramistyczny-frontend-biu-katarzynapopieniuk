import NotFoundPage from "./NotFoundPage";
import {useProductColors} from "../components/ColorProvider";
import {useInput} from "../common/InputUtils";
import getMessage from "../common/LanguageVersionMessageFinder";
import React, {useReducer} from "react";
import {useProductCategories} from "../components/ProductCategoriesProvider";

export default function AdminPanelPage({languageVersion, isLoggedUserAdmin}) {
    const { colors, setColors } = useProductColors();
    const { productCategories, setProductCategories } = useProductCategories();
    const [colorFiltersConfig] = useInput(JSON.stringify(colors, undefined, 4));
    const [productCategoriesConfig] = useInput(JSON.stringify(productCategories, undefined, 4));
    const [isColorFilterConfigSelected, toggleColorFilterConfigSelection] = useReducer(isColorFilterConfigSelected => !isColorFilterConfigSelected, false);
    const [isProductCategoriesConfigSelected, toggleProductCategoriesConfigSelection] = useReducer(isProductCategoriesConfigSelected => !isProductCategoriesConfigSelected, false);

    if(!isLoggedUserAdmin) {
        return <NotFoundPage languageVersion={languageVersion}/>
    }

    function onChangeColorsConfig(event) {
        event.preventDefault();
        var newConfig;
        try {
            newConfig = JSON.parse(colorFiltersConfig.value);
        } catch (error) {
            alert(error);
            return;
        }

        setColors(newConfig);
    }

    function onChangeProductCategoriesConfig(event) {
        event.preventDefault();
        var newConfig;
        try {
            newConfig = JSON.parse(productCategoriesConfig.value);
        } catch (error) {
            alert(error);
            return;
        }

        setProductCategories(newConfig);
    }
    /*
    Panel administracyjny - aplikacja powinna umożliwiać administratorowi zarządzanie zamówieniami, klientami, produktami, kategoriami
    i innymi aspektami sklepu internetowego. Panel administracyjny powinien być zabezpieczony hasłem i być dostępny tylko dla uprawnionych użytkowników.
     */

    return <div className="p-4 sm:ml-64">
        <button id="bordered-radio-2" type="button"
                className="w-full h-10 border-2 border-violet-400 bg-violet-50"
                onClick={toggleColorFilterConfigSelection}>
            {getMessage(languageVersion, "colorConfig", LABELS)}
        </button>
        {getColorConfigForm(languageVersion, isColorFilterConfigSelected, colorFiltersConfig, onChangeColorsConfig)}
        <button id="bordered-radio-2" type="button"
                className="w-full h-10 border-2 border-violet-400 bg-violet-50"
                onClick={toggleProductCategoriesConfigSelection}>
            {getMessage(languageVersion, "shopCategoriesConfig", LABELS)}
        </button>
        {getShopCategoriesConfigForm(languageVersion, isProductCategoriesConfigSelected, productCategoriesConfig, onChangeProductCategoriesConfig)}
    </div>
}

function getColorConfigForm(languageVersion, isColorFilterConfigSelected, colorFiltersConfig, onChangeColorsConfig) {
    return <div hidden={!isColorFilterConfigSelected}>
        <textarea {...colorFiltersConfig}
                  id="comment" rows="10"
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none bg-amber-50"
                  placeholder="Write a comment..." required></textarea>
            <button type="button"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-violet-100 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                    onClick={onChangeColorsConfig}>
                {getMessage(languageVersion, "changeColorsConfig", LABELS)}
            </button>
        </div>
}

function getShopCategoriesConfigForm(languageVersion, isShopCategoriesConfigSelected, shopCategoriesConfig, onChangeShopCategoriesConfig) {
    return <div hidden={!isShopCategoriesConfigSelected}>
        <textarea {...shopCategoriesConfig}
                  id="comment" rows="10"
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none bg-amber-50"
                  placeholder="Write a comment..." required></textarea>
        <button type="button"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-violet-100 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                onClick={onChangeShopCategoriesConfig}>
            {getMessage(languageVersion, "changeShopCategoriesConfig", LABELS)}
        </button>
    </div>
}

const LABELS = [
    {
        "name" : "pageNotFound",
        "values": [
            {
                "language" : "english",
                "value": "Page not found"
            },
            {
                "language" : "polish",
                "value": "Strona nie znaleziona"
            }
        ]
    },
    {
        "name" : "sorry",
        "values": [
            {
                "language" : "english",
                "value": "Sorry, we couldn’t find the page you’re looking for."
            },
            {
                "language" : "polish",
                "value": "Przepraszamy, nie możemy znaleźć strony o podanym adresie"
            }
        ]
    },
    {
        "name" : "return",
        "values": [
            {
                "language" : "english",
                "value": "Go back home"
            },
            {
                "language" : "polish",
                "value": "Powrót na stronę główną"
            }
        ]
    },
    {
        "name" : "changeColorsConfig",
        "values": [
            {
                "language" : "english",
                "value": "Save colors filters config"
            },
            {
                "language" : "polish",
                "value": "Zapisz konfigurację filtrów kolorów"
            }
        ]
    },
    {
        "name" : "colorConfig",
        "values": [
            {
                "language" : "english",
                "value": "Color filters configuration"
            },
            {
                "language" : "polish",
                "value": "Konfiguracja filtrów kolorów"
            }
        ]
    },
    {
        "name" : "shopCategoriesConfig",
        "values": [
            {
                "language" : "english",
                "value": "Product categories configuration"
            },
            {
                "language" : "polish",
                "value": "Konfiguracja kategorii produktów"
            }
        ]
    },
    {
        "name" : "changeShopCategoriesConfig",
        "values": [
            {
                "language" : "english",
                "value": "Save product categories configuration"
            },
            {
                "language" : "polish",
                "value": "Zapisz konfigurację kategorii produktów"
            }
        ]
    }
]