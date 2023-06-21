import {
    getProductDescription,
    getProductName
} from "../common/ProductDataRetriever";
import getMessage from "../common/LanguageVersionMessageFinder";
import React from "react";
import {useInput} from "../common/InputUtils";

export default function ProductCreator({languageVersion, product,  onSaveProduct = f => f}) {
    if(product === undefined || product === null) {
        product = createEmptyProduct();
    }

    const [englishProductName] = useInput(getProductName(product, ENGLISH));
    const [polishProductName] = useInput(getProductName(product, POLISH));
    const [englishDescription] = useInput(getProductDescription(product, ENGLISH));
    const [polishDescription] = useInput(getProductDescription(product, POLISH));

    function saveChanges() {
        product.name = [
            {
                "language" : "english",
                "value": englishProductName.value
            },
            {
                "language" : "polish",
                "value": polishProductName.value
            }
        ];

        product.description = [
            {
                "language" : "english",
                "value": englishDescription.value
            },
            {
                "language" : "polish",
                "value": polishDescription.value
            }
        ]

        onSaveProduct(product);
    }

    return <div className="flex font-sans w-1/2 p-4 sm:ml-64">
        <div className="flex-none w-56 relative">
            <img src={product.image} alt={getProductName(product, languageVersion)}
                 className="absolute inset-0 w-full h-full object-cover rounded-lg"
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

function createEmptyProduct() {
    return {
        "id": null,
        "name": [
            {
                "language" : "english",
                "value": ""
            },
            {
                "language" : "polish",
                "value": ""
            }
        ],
        "image": "",
        "ratings": [],
        "rating": 0,
        "quantity": 0,
        "category": [
            {
                "language" : "english",
                "value": ""
            },
            {
                "language" : "polish",
                "value": ""
            }
        ],
        "color": [
            {
                "language" : "english",
                "value": ""
            },
            {
                "language" : "polish",
                "value": ""
            }
        ],
        "price": 0,
        "description": [
            {
                "language" : "english",
                "value": ""
            },
            {
                "language" : "polish",
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
    }
]

const ENGLISH = "english";
const POLISH = "polish";