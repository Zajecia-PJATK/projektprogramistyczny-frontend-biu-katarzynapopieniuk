import {Link} from "react-router-dom";
import getMessage from "../common/LanguageVersionMessageFinder";

export default function NotFoundPage({languageVersion}) {
    return <div className="text-center p-4 sm:ml-64">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{getMessage(languageVersion, "pageNotFound", LABELS)}</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">{getMessage(languageVersion, "sorry", LABELS)}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {getMessage(languageVersion, "return", LABELS)}
            </Link>
        </div>
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
    }
]