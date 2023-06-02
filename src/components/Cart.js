import CartProduct from "./CartProduct";

export default function Cart({cart = [], setCart = f => f, products = [], languageVersion}) {
    return <>
        {getCartProducts(cart, setCart, products, languageVersion)}
    </>
}

function getCartProducts(cart, setCart, products, languageVersion) {
    function removeCartProduct(id) {
        const newCart = cart.filter(simpleProduct => simpleProduct.id !== id)
        setCart(newCart)
    }

    return cart.map(simpleProduct => getProduct(simpleProduct, products, languageVersion, removeCartProduct))
        .filter(simpleProduct => simpleProduct != null);
}

function getProduct(simpleProduct, products, languageVersion, onRemove) {

    var foundProducts = products.filter(product => product.id === simpleProduct.id);
    if(foundProducts.length == 0) {
        return null;
    }

    var product = foundProducts[0];
    return <CartProduct product={product} quantity={simpleProduct.quantity} languageVersion={languageVersion} onRemove={onRemove}/>
}

