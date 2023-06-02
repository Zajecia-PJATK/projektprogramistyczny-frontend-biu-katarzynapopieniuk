export default function getAverageRating(product) {
    return getAverage([...product.ratings, product.rating]);
}

function getAverage(ratings) {
    let sum = ratings.reduce( (accumulator, currentValue) => accumulator + currentValue,0);
    return (sum / ratings.length).toFixed(2);
}