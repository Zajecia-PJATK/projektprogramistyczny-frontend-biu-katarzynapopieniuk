import Cart from "../components/Cart";

export default function CartPage({cart=[], setCart = f => f, products = []}) {
    return <>
        <div>Cart</div>
        <Cart cart={cart} setCart={setCart} products={products}/>
    </>
}