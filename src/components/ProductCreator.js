import {
    getProductCategory, getProductColor,
    getProductDescription,
    getProductName
} from "../common/ProductDataRetriever";
import getMessage from "../common/LanguageVersionMessageFinder";
import React, {useState} from "react";
import {useInput} from "../common/InputUtils";
import {useProductCategories} from "./ProductCategoriesProvider";
import {useProductColors} from "./ColorProvider";

export default function ProductCreator({languageVersion, product, onSaveProduct = f => f}) {
    if (product === undefined || product === null) {
        product = createEmptyProduct();
    }

    const [englishProductName] = useInput(getProductName(product, ENGLISH));
    const [polishProductName] = useInput(getProductName(product, POLISH));
    const [englishDescription] = useInput(getProductDescription(product, ENGLISH));
    const [polishDescription] = useInput(getProductDescription(product, POLISH));
    const [productPrice] = useInput(product.price.toString());
    const [productCategory, setProductCategory] = useState(getProductCategory(product, ENGLISH));
    const [productColor, setProductColor] = useState(getProductColor(product, ENGLISH));
    const {productCategories} = useProductCategories();
    const {colors} = useProductColors();
    const [validationMessage, setValidationMessage] = useState("");

    function saveChanges() {
        product.name = [
            {
                "language": "english",
                "value": englishProductName.value
            },
            {
                "language": "polish",
                "value": polishProductName.value
            }
        ];

        product.description = [
            {
                "language": "english",
                "value": englishDescription.value
            },
            {
                "language": "polish",
                "value": polishDescription.value
            }
        ];

        product.color = colors.filter(c => c.name === productColor)[0].values;
        product.category = productCategories.filter(c => c.name === productCategory).map(
            c => {
                const catName = c.name;
                return c.displayName.map(displayName => displayName.language === ENGLISH ? {
                        "language" : ENGLISH,
                        "value": catName
                    } : displayName
                )}
        )[0];


        setValidationMessage(getValidationMessage(productPrice.value, product, languageVersion));
        if(validationMessage !== "") {
            return;
        }
        setValidationMessage(getMessage(languageVersion, "saveSuccessful", LABELS));

        onSaveProduct(product);
    }

    function onProductCategoryChange(event) {
        setProductCategory(event.target.value);
    }

    function onProductColorChange(event) {
        setProductColor(event.target.value);
    }

    return <div className="flex font-sans w-1/2 p-4 sm:ml-64">
        <div className="flex-none w-56 relative">
            <img src={product.image} alt={getProductName(product, languageVersion)}
                 className="absolute inset-0 w-full object-cover rounded-lg"
                 loading="lazy"/>
        </div>
        <form className="flex-auto p-2">
            <div className="flex flex-wrap">
                <div className="flex-auto font-medium text-slate-900">
                    {getMessage(languageVersion, "englishName", LABELS)}
                    {getEditableTextArea(englishProductName)}
                </div>
                <div className="flex-auto font-medium text-slate-900">
                    {getMessage(languageVersion, "polishName", LABELS)}
                    {getEditableTextArea(polishProductName)}
                </div>
            </div>
            <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>

            <div className="flex flex-wrap">
                <div className="flex-auto font-medium text-slate-900">
                    {getMessage(languageVersion, "englishDescription", LABELS)}
                    {getEditableTextArea(englishDescription)}
                </div>
                <div className="flex-auto font-medium text-slate-900">
                    {getMessage(languageVersion, "polishDescription", LABELS)}
                    {getEditableTextArea(polishDescription)}
                </div>
            </div>
            <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>

            <h3 className="-mx-2 -my-3 flex w-full items-center justify-between px-2 py-3 text-gray-900 font-medium">
                {getMessage(languageVersion, "category", LABELS)}
            </h3>
            <ul>
                {getProductCategories(productCategories, languageVersion, productCategory, onProductCategoryChange)}
            </ul>
            <ul>
                {getColors(languageVersion, colors, productColor, onProductColorChange)}
            </ul>

            <div className="flex-auto font-medium text-slate-900">
                {getMessage(languageVersion, "price", LABELS)}
                {getEditableNumberTextArea(productPrice)}
            </div>

            <div className="text-red-600 font-bold">
                {validationMessage}
            </div>
            <button className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white"
                    type="button" onClick={saveChanges}>
                {getMessage(languageVersion, "saveProduct", LABELS)}
            </button>
        </form>
    </div>
}

function getEditableTextArea(text) {
    return <div>
        <textarea {...text}
                  id="comment" rows="2"
                  className="px-0 w-10/12 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none bg-amber-50"
                  placeholder="..." required></textarea>
    </div>
}

function getEditableNumberTextArea(text) {
    return <div>
        <input type="text" {...text}
                  id="comment"
                  pattern={PRICE_PATTERN}
                  className="px-0 w-10/12 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none bg-amber-50"
                  placeholder="..." required/>
    </div>
}

function getProductCategories(categories, languageVersion, productCategory, onProductCategoryChange) {
    return categories.map(category => getSimpleProductCategory(category, languageVersion))
        .map(category => getCategoryListElement(category, productCategory, onProductCategoryChange));
}

function getSimpleProductCategory(category, languageVersion) {
    return {
        category: category.name,
        displayName: category.displayName.filter(name => name.language === languageVersion).map(name => name.value)[0]
    };
}

function getCategoryListElement(category, productCategory, onProductCategoryChange) {
    return <li className="w-full border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center pl-3">
            <input type="radio" value={category.category} name="categories-radio"
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-5000"
                   checked={productCategory === category.category}
                   onChange={onProductCategoryChange}/>
            <label htmlFor={`list-category-${category.name}`}
                   className="w-full py-3 ml-2 text-sm font-medium text-gray-900">
                {category.displayName}
            </label>
        </div>
    </li>
}

function getColors(languageVersion, productColors, productColor, onProductColorChange) {
    return <div className="border-t border-gray-200 py-6">
        <h3 className="-mx-2 -my-3 flex w-full items-center justify-between px-2 py-3 text-gray-900 font-medium">
            {getMessage(languageVersion, "color", LABELS)}
        </h3>
        <div className="pt-6">
            {productColors.map(color => getColorListElement(languageVersion, color, onProductColorChange, productColor))}
        </div>
    </div>
}

function getColorListElement(languageVersion, color, onProductColorChange, productColor) {
    return <li className="w-full border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center pl-3">
            <input name="color[]" value={color.name} type="radio"
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-5000"
                   onChange={onProductColorChange}
                   checked={productColor === color.name}/>
            <label htmlFor="filter-mobile-color-5"
                   className="w-full py-3 ml-2 text-sm font-medium text-gray-900">{color.values.filter(color => color.language === languageVersion).map(color => color.value)[0]}</label>
        </div>
    </li>
}

function getValidationMessage(productPrice, product, languageVersion) {
    if(product.name.filter(name => name.value === "").length > 0) {
        return `${getMessage(languageVersion, "required", LABELS)} ${getMessage(languageVersion, "name", LABELS)}`;
    }

    if(product.description.filter(description => description.value === "").length > 0) {
        return `${getMessage(languageVersion, "required", LABELS)} ${getMessage(languageVersion, "description", LABELS)}`;
    }

    if(!isNaN(parseFloat(productPrice))) {
        product.price = parseFloat(productPrice);
    } else {
        return `${getMessage(languageVersion, "priceMustMatchPattern", LABELS)} ${PRICE_PATTERN}`;
    }

    return "";
}

function createEmptyProduct() {
    return {
        "id": null,
        "name": [
            {
                "language": "english",
                "value": ""
            },
            {
                "language": "polish",
                "value": ""
            }
        ],
        "image": "",
        "ratings": [],
        "rating": 0,
        "quantity": 0,
        "category": [
            {
                "language": "english",
                "value": ""
            },
            {
                "language": "polish",
                "value": ""
            }
        ],
        "color": [
            {
                "language": "english",
                "value": ""
            },
            {
                "language": "polish",
                "value": ""
            }
        ],
        "price": 0,
        "description": [
            {
                "language": "english",
                "value": ""
            },
            {
                "language": "polish",
                "value": ""
            }
        ]
    }
}

const LABELS = [
    {
        "name": "color",
        "values": [
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
        "name": "category",
        "values": [
            {
                "language": "english",
                "value": "Category"
            },
            {
                "language": "polish",
                "value": "Kategoria"
            }
        ]
    },
    {
        "name": "englishName",
        "values": [
            {
                "language": "english",
                "value": "english name"
            },
            {
                "language": "polish",
                "value": "nazwa po angielsku"
            }
        ]
    },
    {
        "name": "polishName",
        "values": [
            {
                "language": "english",
                "value": "polish name"
            },
            {
                "language": "polish",
                "value": "nazwa po polsku"
            }
        ]
    },
    {
        "name": "englishDescription",
        "values": [
            {
                "language": "english",
                "value": "english description"
            },
            {
                "language": "polish",
                "value": "opis po angielsku"
            }
        ]
    },
    {
        "name": "polishDescription",
        "values": [
            {
                "language": "english",
                "value": "polish description"
            },
            {
                "language": "polish",
                "value": "opis po polsku"
            }
        ]
    },
    {
        "name": "saveProduct",
        "values": [
            {
                "language": "english",
                "value": "Save product"
            },
            {
                "language": "polish",
                "value": "Zapisz produkt"
            }
        ]
    },
    {
        "name": "price",
        "values": [
            {
                "language": "english",
                "value": "Price [zł]"
            },
            {
                "language": "polish",
                "value": "Cena [zł]"
            }
        ]
    },
    {
        "name": "priceMustMatchPattern",
        "values": [
            {
                "language": "english",
                "value": "Price must match pattern: "
            },
            {
                "language": "polish",
                "value": "Cena musi być zgodna z paternem: "
            }
        ]
    },
    {
        "name": "required",
        "values": [
            {
                "language": "english",
                "value": "Required attribute: "
            },
            {
                "language": "polish",
                "value": "Pole wymagane: "
            }
        ]
    },
    {
        "name": "name",
        "values": [
            {
                "language": "english",
                "value": "name"
            },
            {
                "language": "polish",
                "value": "nazwa"
            }
        ]
    },
    {
        "name": "description",
        "values": [
            {
                "language": "english",
                "value": "description"
            },
            {
                "language": "polish",
                "value": "opis"
            }
        ]
    },
    {
        "name": "saveSuccessful",
        "values": [
            {
                "language": "english",
                "value": "Save successful"
            },
            {
                "language": "polish",
                "value": "Zapis udany"
            }
        ]
    }
]

const ENGLISH = "english";
const POLISH = "polish";
const PRICE_PATTERN = "[0-9]+[.]?[0-9]{0,2}";