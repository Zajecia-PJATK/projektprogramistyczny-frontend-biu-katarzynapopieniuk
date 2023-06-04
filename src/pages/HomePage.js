import SimpleProduct from "../components/home/SimpleProduct";

export default function HomePage({products, languageVersion}) {
    return <div>
        <div className="p-4 sm:ml-64">
            {products.map(product => <SimpleProduct product={product} languageVersion={languageVersion}/>)}
        </div>
    </div>
}