import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import getMessage from "../common/LanguageVersionMessageFinder";
import {SHA256} from "crypto-js";

export default function SignupForm({languageVersion, accounts, setAccounts = f => f}) {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(15, 'Must be at most 15 characters')
                .required(getMessage(languageVersion, "required", LABELS)),
            lastName: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(20, 'Must be at most 20 characters')
                .required(getMessage(languageVersion, "required", LABELS)),
            email: Yup.string().email('Invalid email address').required(getMessage(languageVersion, "required", LABELS)),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .max(20, 'Must be at most 20 characters')
                .required(getMessage(languageVersion, "required", LABELS)),
            passwordConfirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: values => {
            var message = addAccount(values, accounts, setAccounts);
            alert(JSON.stringify(message, null, 2));
        },
    });
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">{getMessage(languageVersion, "signUp", LABELS)}</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="firstName">{getMessage(languageVersion, "firstName", LABELS)}</label>
                            <input
                                id="firstName"
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                {...formik.getFieldProps('firstName')}
                                placeholder={getMessage(languageVersion, "firstName", LABELS)}
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div>{formik.errors.firstName}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="lastName">{getMessage(languageVersion, "lastName", LABELS)}</label>
                            <input id="lastName"
                                   type="text"
                                   className="block border border-grey-light w-full p-3 rounded mb-4"
                                   {...formik.getFieldProps('lastName')}
                                   placeholder={getMessage(languageVersion, "lastName", LABELS)}/>
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div>{formik.errors.lastName}</div>
                            ) : null}
                        </div>
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
                        <div>
                            <label htmlFor="passwordConfirmation">{getMessage(languageVersion, "confirmPassword", LABELS)}</label>
                            <input id="passwordConfirmation"
                                   type="password"
                                   className="block border border-grey-light w-full p-3 rounded mb-4"
                                   {...formik.getFieldProps('passwordConfirmation')}
                                   placeholder={getMessage(languageVersion, "confirmPassword", LABELS)}/>
                            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                                <div>{formik.errors.passwordConfirmation}</div>
                            ) : null}
                        </div>

                        <button type="submit"
                                className="w-full text-center py-3 rounded bg-violet-600 text-white hover:bg-violet-800 focus:outline-none my-1">
                            {getMessage(languageVersion, "signUp", LABELS)}
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

                <div className="text-grey-dark mt-6">
                    {getMessage(languageVersion, "alreadyHaveAccount", LABELS)}
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                        {getMessage(languageVersion, "logIn", LABELS)}
                    </a>.
                </div>
            </div>
        </div>
    );
};

function addAccount(data, accounts, setAccounts) {
    var existingAccount = accounts.filter(account => account.email === data.email);
    if(existingAccount.length > 0) {
        return "Account already exists!";
    }

    var hashedPassword = SHA256(data.password).toString();
    var newAccount = {
        "firstName": data.firstName,
        "lastName": data.lastName,
        "email": data.email,
        "password": hashedPassword,
        "isAdmin": false
    }

    setAccounts([...accounts, newAccount]);
    return "Account created successfully";
}

const LABELS = [
    {
        "name" : "firstName",
        "values": [
            {
                "language" : "english",
                "value": "First name"
            },
            {
                "language" : "polish",
                "value": "Imię"
            }
        ]
    },
    {
        "name" : "lastName",
        "values": [
            {
                "language" : "english",
                "value": "Last name"
            },
            {
                "language" : "polish",
                "value": "Nazwisko"
            }
        ]
    },
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
        "name" : "agreement",
        "values": [
            {
                "language" : "english",
                "value": "By signing up, you agree to the "
            },
            {
                "language" : "polish",
                "value": "Rejestrując się zgadzasz się z "
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
        "name" : "alreadyHaveAccount",
        "values": [
            {
                "language" : "english",
                "value": "Already have an account? "
            },
            {
                "language" : "polish",
                "value": "Masz już konto? "
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