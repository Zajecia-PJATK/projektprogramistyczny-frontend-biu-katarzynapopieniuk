import getMessage from "./LanguageVersionMessageFinder";

export default function getOrderStatus(order, languageVersion) {
    return getMessage(languageVersion, order.status, LABELS);
}

const LABELS = [
    {
        "name" : "sent",
        "values": [
            {
                "language" : "english",
                "value": "sent"
            },
            {
                "language" : "polish",
                "value": "wysłane"
            }
        ]
    }
]