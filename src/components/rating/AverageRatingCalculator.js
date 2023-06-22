import getMessage from "../../common/LanguageVersionMessageFinder";

export default function getAverageRating(product, languageVersion) {
    var ratingsAmount = product.rating === 0 ? product.ratings.length : product.ratings.length + 1;
    return getAverage([...product.ratings, product.rating], ratingsAmount, languageVersion);
}

function getAverage(ratings, ratingsAmount, languageVersion) {
    if(ratingsAmount === 0) {
        return getMessage(languageVersion, "noRatingsYet", LABELS);
    }

    let sum = ratings.reduce( (accumulator, currentValue) => accumulator + currentValue,0);
    return (sum / ratingsAmount).toFixed(2);
}

const LABELS = [
    {
        "name" : "noRatingsYet",
        "values": [
            {
                "language" : "english",
                "value": "No ratings yet"
            },
            {
                "language" : "polish",
                "value": "Brak ocen"
            }
        ]
    }
]