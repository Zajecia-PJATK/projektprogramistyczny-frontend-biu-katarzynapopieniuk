export default function Cart({cart = [], setCart = f => f, products = []}) {
    return <>
        {getCartProducts(cart, setCart, products)}
    </>
}

function getCartProducts(cart, setCart, products) {
    return cart.map(simpleProduct => getProduct(simpleProduct, products))
        .filter(simpleProduct => simpleProduct != null);
}

function getProduct(simpleProduct, products) {

    var foundProducts = products.filter(product => product.id === simpleProduct.id);
    if(foundProducts.length == 0) {
        return null;
    }

    var product = foundProducts[0];
    return <div>Product: id: {product.id}, quantity: {simpleProduct.quantity}</div>
}
