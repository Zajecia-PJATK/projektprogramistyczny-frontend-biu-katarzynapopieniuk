import {Link} from "react-router-dom";
import getMessage from "../common/LanguageVersionMessageFinder";
import NotFoundPage from "./NotFoundPage";

export default function AdminPanelPage({languageVersion, isLoggedUserAdmin}) {
    if(!isLoggedUserAdmin) {
        return <NotFoundPage languageVersion={languageVersion}/>
    }

    /*
    Panel administracyjny - aplikacja powinna umożliwiać administratorowi zarządzanie zamówieniami, klientami, produktami, kategoriami
    i innymi aspektami sklepu internetowego. Panel administracyjny powinien być zabezpieczony hasłem i być dostępny tylko dla uprawnionych użytkowników.
     */

    return <div className="text-center p-4 sm:ml-64">
        Admin panel
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