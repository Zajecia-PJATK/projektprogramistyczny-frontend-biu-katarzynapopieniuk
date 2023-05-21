export default function LanguageVersionPicker({onPickedLanguage = f => f}) {
    return <div>{LANGUAGES.map(language => getLanguageButton(language, onPickedLanguage))}</div>
}

function getLanguageButton(language, onPickedLanguage =  f => f) {
    return <button onClick={() => onPickedLanguage(language.name)}
        className="block text-white w-20 m-2 cursor-pointer">
        {language.value}
    </button>
}

const LANGUAGES = [
    {
        "name" : "polish",
        "value": "polski"
    },
    {
        "name" : "english",
        "value": "english"
    }
]