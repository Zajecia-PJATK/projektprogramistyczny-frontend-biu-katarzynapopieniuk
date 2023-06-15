export default function getCartTotalPrice(cart, products) {
    return cart.map(simpleProduct => getProductTotalPrice(simpleProduct, products))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function getProductTotalPrice(simpleProduct, products) {
    var product = getProduct(simpleProduct, products);
    if(product == null) {
        return 0;
    }

    return product.price * simpleProduct.quantity;
}

function getProduct(simpleProduct, products) {
    var foundProducts = products.filter(product => product.id === simpleProduct.id);
    if(foundProducts.length === 0) {
        return null;
    }

    return foundProducts[0];
}