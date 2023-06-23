export default function getCartTotalPrice(cart, products, discountValue = 0, usedProductCoupons=[]) {
    return cart.map(simpleProduct => getProductTotalPrice(simpleProduct, products, usedProductCoupons))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0) * (100-discountValue) / 100;
}

function getProductTotalPrice(simpleProduct, products, usedProductCoupons) {
    var product = getProduct(simpleProduct, products);
    if(product == null) {
        return 0;
    }

    var matchingCoupon = usedProductCoupons.filter(coupon => coupon.productId === product.id);
    var discount = matchingCoupon.length > 0 ? matchingCoupon[0].discount : 0;
    return product.price * simpleProduct.quantity * (100-discount)/100;
}

function getProduct(simpleProduct, products) {
    var foundProducts = products.filter(product => product.id === simpleProduct.id);
    if(foundProducts.length === 0) {
        return null;
    }

    return foundProducts[0];
}