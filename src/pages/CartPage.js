import Cart from "../components/Cart";

export default function CartPage({cart=[], setCart = f => f, products = [], languageVersion}) {
    return <>
        <Cart cart={cart} setCart={setCart} products={products} languageVersion={languageVersion}/>
    </>
}