export default function getProductBySimpleProduct(simpleProduct, products) {
    var foundProducts = products.filter(product => product.id === simpleProduct.id);
    if (foundProducts.length === 0) {
        return null;
    }

    return foundProducts[0];
}