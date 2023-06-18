import LoginForm from "../components/LoginForm";
import getMessage from "../common/LanguageVersionMessageFinder";

export default function LoginPage({languageVersion, accounts, setLoggetUserEmail, loggedUserEmail}) {
    if (loggedUserEmail !== "") {
        return <div className="p-4 sm:ml-64">
            {getMessage(languageVersion, "successfulLogin", LABELS)}
        </div>
    }
    return <div className="p-4 sm:ml-64">
        <LoginForm languageVersion={languageVersion} accounts={accounts} setLoggetUserEmail={setLoggetUserEmail}/>
    </div>
}

const LABELS = [
    {
        "name": "successfulLogin",
        "values": [
            {
                "language": "english",
                "value": "Hello!"
            },
            {
                "language": "polish",
                "value": "Witaj!"
            }
        ]
    }
]