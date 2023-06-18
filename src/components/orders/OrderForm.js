import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import getMessage from "../../common/LanguageVersionMessageFinder";
import CardPaymentForm from "./CardPaymentForm";
import NotFoundPage from "../../pages/NotFoundPage";
import getCartTotalPrice from "../../common/CartTotalPriceCalculator";
import {v4 as uuidv4} from 'uuid';

export default function OrderForm({languageVersion, cart=[], products = [], addOrder, loggedUserEmail, setCart}) {
    const [paymentMethod, setPaymentMethod] = useState("card");

    function onPaymentMethodChange(event) {
        setPaymentMethod(event.target.value);
    }

    const formik = useFormik({
        initialValues: {
            street: '',
            city: '',
            country: '',
            postCode: '',
        },
        validationSchema: Yup.object({
            street: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(15, 'Must be at most 15 characters')
                .required(getMessage(languageVersion, "required", LABELS)),
            city: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(20, 'Must be at most 20 characters')
                .required(getMessage(languageVersion, "required", LABELS)),
            country: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(20, 'Must be at most 20 characters')
                .required(getMessage(languageVersion, "required", LABELS)),
            postCode: Yup.string()
                .min(5, 'Must be at least 5 characters')
                .max(7, 'Must be at most 7 characters')
                .required(getMessage(languageVersion, "required", LABELS)),
        }),
        onSubmit: values => {
           onAddOrder(values, cart, addOrder, loggedUserEmail, products, getInitialStatusDependingOnPaymentMethod(paymentMethod));
            setCart([]);
        },
    });
    if(loggedUserEmail === "") {
        return <NotFoundPage languageVersion={languageVersion}/>
    }

    return (
        <div className="bg-grey-lighter flex flex-col">
            <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">{getMessage(languageVersion, "checkout", LABELS)}</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            {getMessage(languageVersion, "address", LABELS)}
                        </div>
                        <div>
                            <label htmlFor="street">{getMessage(languageVersion, "street", LABELS)}</label>
                            <input
                                id="street"
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                {...formik.getFieldProps('street')}
                                placeholder={getMessage(languageVersion, "street", LABELS)}
                            />
                            {formik.touched.street && formik.errors.street ? (
                                <div>{formik.errors.street}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="city">{getMessage(languageVersion, "city", LABELS)}</label>
                            <input id="city"
                                   type="text"
                                   className="block border border-grey-light w-full p-3 rounded mb-4"
                                   {...formik.getFieldProps('city')}
                                   placeholder={getMessage(languageVersion, "city", LABELS)}/>
                            {formik.touched.city && formik.errors.city ? (
                                <div>{formik.errors.city}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="country">{getMessage(languageVersion, "country", LABELS)}</label>
                            <input id="country"
                                   type="text"
                                   className="block border border-grey-light w-full p-3 rounded mb-4"
                                   {...formik.getFieldProps('country')}
                                   placeholder={getMessage(languageVersion, "country", LABELS)}/>
                            {formik.touched.country && formik.errors.country ? (
                                <div>{formik.errors.country}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="city">{getMessage(languageVersion, "postCode", LABELS)}</label>
                            <input id="postCode"
                                   type="text"
                                   className="block border border-grey-light w-full p-3 rounded mb-4"
                                   {...formik.getFieldProps('postCode')}
                                   placeholder={getMessage(languageVersion, "postCode", LABELS)}/>
                            {formik.touched.postCode && formik.errors.postCode ? (
                                <div>{formik.errors.postCode}</div>
                            ) : null}
                        </div>

                        <div>
                            {getMessage(languageVersion, "paymentMethod", LABELS)}
                        </div>

                        <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input id="bordered-radio-1" type="radio" value="transfer" name="bordered-radio"
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={onPaymentMethodChange}
                                   checked={paymentMethod === "transfer"}
                            />
                                <label htmlFor="bordered-radio-1"
                                       className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {getMessage(languageVersion, "transfer", LABELS)}
                                </label>
                        </div>
                        <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input id="bordered-radio-2" type="radio" value="card" name="bordered-radio"
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                   onChange={onPaymentMethodChange}
                                   checked={paymentMethod === "card"}/>
                                <label htmlFor="bordered-radio-2"
                                       className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {getMessage(languageVersion, "card", LABELS)}
                                </label>
                        </div>

                        <div hidden={paymentMethod !== "card"}>
                            <CardPaymentForm paymentMethod={paymentMethod}/>
                        </div>


                        <button type="submit"
                                className="w-full text-center py-3 rounded bg-violet-600 text-white hover:bg-violet-800 focus:outline-none my-1">
                            {getMessage(languageVersion, "checkout", LABELS)}
                        </button>
                    </form>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        {getMessage(languageVersion, "agreement", LABELS)}
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            {getMessage(languageVersion, "termsOfService", LABELS)}
                        </a>,
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            {getMessage(languageVersion, "privacyPolicy", LABELS)}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

function onAddOrder(data, cart, addOrder, loggedUserEmail, products, status) {
    function createOrderProduct(product) {
        return {
            "id": product.id,
            "quantity": product.quantity,
            "price": product.price,
            "usedCouponId": null
        }
    }

    var orderProducts = cart.map(product => createOrderProduct(product))

    var newOrder = {
        "id": uuidv4(),
        "userEmail": loggedUserEmail,
        "address": {
            "street": data.street,
            "city": data.city,
            "country": data.country,
            "postcode": data.postCode
        },
        "products": orderProducts,
        "promoCodeId": null,
        "totalPrice": getCartTotalPrice(cart, products),
        "paymentMethod": "card",
        "status": status
    }

    addOrder(newOrder);
    return "Order created successfully";
}

function getInitialStatusDependingOnPaymentMethod(paymentMethod) {
    if(paymentMethod === "card") {
        return "inProcess";
    }

    return "waitingForPayment";
}

const LABELS = [
    {
        "name" : "street",
        "values": [
            {
                "language" : "english",
                "value": "street"
            },
            {
                "language" : "polish",
                "value": "ulica"
            }
        ]
    },
    {
        "name" : "city",
        "values": [
            {
                "language" : "english",
                "value": "city"
            },
            {
                "language" : "polish",
                "value": "miasto"
            }
        ]
    },
    {
        "name" : "country",
        "values": [
            {
                "language" : "english",
                "value": "country"
            },
            {
                "language" : "polish",
                "value": "kraj"
            }
        ]
    },
    {
        "name" : "postCode",
        "values": [
            {
                "language" : "english",
                "value": "postal code"
            },
            {
                "language" : "polish",
                "value": "kod pocztowy"
            }
        ]
    },
    {
        "name" : "confirmPassword",
        "values": [
            {
                "language" : "english",
                "value": "Confirm password"
            },
            {
                "language" : "polish",
                "value": "Potwierdź hasło"
            }
        ]
    },
    {
        "name" : "checkout",
        "values": [
            {
                "language" : "english",
                "value": "Checkout"
            },
            {
                "language" : "polish",
                "value": "Złóż zamówienie"
            }
        ]
    },
    {
        "name" : "agreement",
        "values": [
            {
                "language" : "english",
                "value": "By checking out, you agree to the "
            },
            {
                "language" : "polish",
                "value": "Składając zamówienie się zgadzasz się z "
            }
        ]
    },
    {
        "name" : "termsOfService",
        "values": [
            {
                "language" : "english",
                "value": "Terms of Service"
            },
            {
                "language" : "polish",
                "value": "Regulaminem"
            }
        ]
    },
    {
        "name" : "paymentMethod",
        "values": [
            {
                "language" : "english",
                "value": "Payment method"
            },
            {
                "language" : "polish",
                "value": "Metoda płatności"
            }
        ]
    },
    {
        "name" : "transfer",
        "values": [
            {
                "language" : "english",
                "value": "Transfer"
            },
            {
                "language" : "polish",
                "value": "Przelew"
            }
        ]
    },
    {
        "name" : "card",
        "values": [
            {
                "language" : "english",
                "value": "Card"
            },
            {
                "language" : "polish",
                "value": "Karta"
            }
        ]
    },
    {
        "name" : "address",
        "values": [
            {
                "language" : "english",
                "value": "Delivery address"
            },
            {
                "language" : "polish",
                "value": "Adres dostawy"
            }
        ]
    },
    {
        "name" : "required",
        "values": [
            {
                "language" : "english",
                "value": "Required"
            },
            {
                "language" : "polish",
                "value": "Pole wymagane"
            }
        ]
    }

]