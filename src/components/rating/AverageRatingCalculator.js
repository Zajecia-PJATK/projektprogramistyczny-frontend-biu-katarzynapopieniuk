export default function getAverageRating(product) {
    var ratingsAmount = product.rating === 0 ? product.ratings.length : product.ratings.length + 1;
    return getAverage([...product.ratings, product.rating], ratingsAmount);
}

function getAverage(ratings, ratingsAmount) {
    let sum = ratings.reduce( (accumulator, currentValue) => accumulator + currentValue,0);
    return (sum / ratingsAmount).toFixed(2);
}