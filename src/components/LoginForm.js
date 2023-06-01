import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import getMessage from "../common/LanguageVersionMessageFinder";
import {SHA256} from "crypto-js";

export default function LoginForm({languageVersion, accounts, setLoggetUserEmail}) {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .required('Password is required')
        }),
        onSubmit: values => {
            alert(JSON.stringify(tryToLogIn(values, accounts, setLoggetUserEmail, languageVersion), null, 2));
        },
    });
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">{getMessage(languageVersion, "logIn", LABELS)}</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="email">{getMessage(languageVersion, "email", LABELS)}</label>
                            <input id="email"
                                   type="email"
                                   className="block border border-grey-light w-full p-3 rounded mb-4"
                                   {...formik.getFieldProps('email')}
                                   placeholder={getMessage(languageVersion, "email", LABELS)}/>
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="password">{getMessage(languageVersion, "password", LABELS)}</label>
                            <input id="password"
                                   type="password"
                                   className="block border border-grey-light w-full p-3 rounded mb-4"
                                   {...formik.getFieldProps('password')}
                                   placeholder={getMessage(languageVersion, "password", LABELS)}/>
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </div>

                        <button type="submit"
                                className="w-full text-center py-3 rounded bg-violet-600 text-white hover:bg-violet-800 focus:outline-none my-1">
                            {getMessage(languageVersion, "logIn", LABELS)}
                        </button>
                    </form>

                </div>

                <div className="text-grey-dark mt-6">
                    {getMessage(languageVersion, "noAccountYet", LABELS)}
                    <a className="no-underline border-b border-blue text-blue" href="../signup/">
                        {getMessage(languageVersion, "signUp", LABELS)}
                    </a>.
                </div>
            </div>
        </div>
    );
};

function tryToLogIn(data, accounts, setLoggetUserEmail, languageVersion) {
    var existingAccount = accounts.filter(account => account.email === data.email)
        .filter(account => account.password === SHA256(data.password).toString());
    if(existingAccount.length > 0) {
        var account = existingAccount[0];
        setLoggetUserEmail(account.email);
        return getMessage(languageVersion, "successfulLogin", LABELS);
    } else {
        return getMessage(languageVersion, "wrongLoginData", LABELS);
    }
}

const LABELS = [
    {
        "name" : "email",
        "values": [
            {
                "language" : "english",
                "value": "Email Address"
            },
            {
                "language" : "polish",
                "value": "Adres email"
            }
        ]
    },
    {
        "name" : "password",
        "values": [
            {
                "language" : "english",
                "value": "Password"
            },
            {
                "language" : "polish",
                "value": "Hasło"
            }
        ]
    },
    {
        "name" : "logIn",
        "values": [
            {
                "language" : "english",
                "value": "Log in"
            },
            {
                "language" : "polish",
                "value": "Zaloguj się"
            }
        ]
    },
    {
        "name" : "agreement",
        "values": [
            {
                "language" : "english",
                "value": "By signing up, you agree to the"
            },
            {
                "language" : "polish",
                "value": "Rejestrując się zgadzasz się z"
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
        "name" : "privacyPolicy",
        "values": [
            {
                "language" : "english",
                "value": "Privacy Policy"
            },
            {
                "language" : "polish",
                "value": "Polityką prywatności"
            }
        ]
    },
    {
        "name" : "noAccountYet",
        "values": [
            {
                "language" : "english",
                "value": "Don't have an account? "
            },
            {
                "language" : "polish",
                "value": "Nie masz konta? "
            }
        ]
    },
    {
        "name" : "signUp",
        "values": [
            {
                "language" : "english",
                "value": "Sign up"
            },
            {
                "language" : "polish",
                "value": "Zarejestruj się"
            }
        ]
    },
    {
        "name" : "wrongLoginData",
        "values": [
            {
                "language" : "english",
                "value": "Incorrect data"
            },
            {
                "language" : "polish",
                "value": "Niepoprawne dane logowania"
            }
        ]
    },
    {
        "name" : "successfulLogin",
        "values": [
            {
                "language" : "english",
                "value": "Hello!"
            },
            {
                "language" : "polish",
                "value": "Witaj!"
            }
        ]
    }
]