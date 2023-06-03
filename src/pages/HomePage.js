import SimpleProduct from "../components/home/SimpleProduct";

export default function HomePage({products, languageVersion}) {
    return <div>{products.map(product => <SimpleProduct product={product} languageVersion={languageVersion}/>)}</div>
}