import {useEffect, useState} from "react";

export default function ReviewsRetriever() {
    const [reviews, setReviews] = useState();
    const [reviewsDivs, setReviewsDivs] = useState([]);
    const [state, setState] = useState('');

    useEffect( () => {
        callApi(setReviews, setState);
    }, []);

    if (state !== 'success') {
        return (
            <h1>{state}</h1>
        );
    }

    reviews.then(review => getReviews(review.slice(0, 10)))
        .then(r => setReviewsDivs(r));

    return (
        <div>
            <div id="reviews">
                {reviewsDivs}
            </div>
        </div>
    );
}

function callApi(setReviews, setState) {
    setState('loading');
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => {
            setReviews(response.json());
            setState('success')
        })
        .catch(() => {
            setState('error');
        });
}

function getReviews(reviews) {
    return reviews.map(review => getReview(review));
}

function getReview(review) {
    return <article className="p-6 mb-6 text-base bg-white rounded-lg border-t border-gray-200">
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    {review.name}
                </p>
            </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
            {review.body}
        </p>
    </article>
}