import getMessage from "../common/LanguageVersionMessageFinder";
import {useParams} from "react-router-dom";

export default function ReturnPolicyPage({languageVersion}) {
    const {id} = useParams();
    return <div className="text-center p-4 sm:ml-64">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{getMessage(languageVersion, "pageName", LABELS)}</h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
            {getMessage(languageVersion, "returnPolicy", LABELS)}
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
            {ADDRESS}
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
            {getMessage(languageVersion, "useOrderId", LABELS)}
            {id}
        </div>
    </div>
}

const LABELS = [
    {
        "name": "returnPolicy",
        "values": [
            {
                "language": "english",
                "value": "To return product send it to our address: "
            },
            {
                "language": "polish",
                "value": "Aby zwrócić zamówienie odeślij produkty na adres: "
            }
        ]
    },
    {
        "name": "useOrderId",
        "values": [
            {
                "language": "english",
                "value": "Write on the envelope order ID: "
            },
            {
                "language": "polish",
                "value": "Zapisz na kopercie nr zamówienia: "
            }
        ]
    },
    {
        "name": "pageName",
        "values": [
            {
                "language": "english",
                "value": "Return order policy"
            },
            {
                "language": "polish",
                "value": "Zasady zwrotu zamówienia"
            }
        ]
    }
];

const ADDRESS = "SuperShop, ul. Karetki Pogotowia 1/2, 34-500 Prabuty";