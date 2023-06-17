import getMessage from "./LanguageVersionMessageFinder";

export default function getOrderStatus(order, languageVersion, orderStatuses) {
    return getMessage(languageVersion, order.status, orderStatuses);
}