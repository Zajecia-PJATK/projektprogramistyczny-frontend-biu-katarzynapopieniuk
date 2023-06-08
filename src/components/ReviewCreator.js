export function getReview(review) {
    return <article className="p-6 mb-6 text-base bg-white rounded-lg border-t border-gray-200">
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    {review.name}
                </p>
            </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
            {review.body}
        </p>
    </article>
}