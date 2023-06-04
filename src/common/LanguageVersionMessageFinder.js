export default function getMessage(languageVersion, name, messages) {
    return messages.filter(message => message.name === name)
        .flatMap(message => message.values)
        .filter(message => message.language === languageVersion)
        .map(message => message.value)[0];
}