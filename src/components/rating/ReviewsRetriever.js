import {useEffect, useState} from "react";
import {getReview} from "../ReviewCreator";

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