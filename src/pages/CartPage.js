import Cart from "../components/Cart";

export default function CartPage({cart=[], setCart = f => f, products = [], languageVersion}) {
    return <div className="p-4 sm:ml-64">
        <Cart cart={cart} setCart={setCart} products={products} languageVersion={languageVersion}/>
    </div>
}