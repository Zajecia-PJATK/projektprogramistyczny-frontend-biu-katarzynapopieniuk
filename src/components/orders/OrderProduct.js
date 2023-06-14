export default function OrderProduct({product, quantity, languageVersion}) {
    return <article className="flex items-start space-x-6 p-6 w-5/12">
        <img src={product.image} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />
        <div className="min-w-0 relative flex-auto text-violet-600 font-bold">
            <div className="font-semibold text-slate-900 truncate pr-20">{getProductName(product, languageVersion)}</div>
            <dl className="mt-2 flex flex-wrap leading-6 text-2xl ml-20">
                <div className="ml-2">
                    {quantity}
                </div>
                <div className="pl-5">
                    {product.price} zł
                </div>
                <div className="pl-5">
                    {quantity * product.price} zł
                </div>
            </dl>
            <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>
        </div>
    </article>
}

function getProductName(product, languageVersion) {
    return product.name.filter(name => name.language==languageVersion).map(name => name.value)[0];
}