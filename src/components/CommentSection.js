import getMessage from "../common/LanguageVersionMessageFinder";
import ReviewsRetriever from "./rating/ReviewsRetriever";
import {useMemo, useState} from "react";

export default function CommentSection({languageVersion}) {
    const [reviews, setReviews] = useState(<ReviewsRetriever/>);

    return <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
        <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {getMessage(languageVersion, "reviews", LABELS)}
                </h2>
            </div>
            <form className="mb-6">
                <div
                    className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <textarea id="comment" rows="6"
                              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                              placeholder="Write a comment..." required></textarea>
                </div>
                <button type="button"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-violet-100 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800">
                    {getMessage(languageVersion, "addReview", LABELS)}
                </button>
            </form>
            <div id="reviews">
                {reviews}
            </div>
        </div>
    </section>
}

const LABELS = [
    {
        "name":
            "reviews",
        "values":
            [
                {
                    "language": "english",
                    "value": "Reviews"
                },
                {
                    "language": "polish",
                    "value": "Opinie"
                }
            ]
    },
    {
        "name":
            "addReview",
        "values":
            [
                {
                    "language": "english",
                    "value": "Add review"
                },
                {
                    "language": "polish",
                    "value": "Dodaj opinię"
                }
            ]
    }
]